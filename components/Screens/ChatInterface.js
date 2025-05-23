import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function ChatInterface({
  selectedPerson,
  isChatActive,
  setChatActive,
  userData,
}) {
  const data = selectedPerson;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const participants = [data.uid, userData.uid].sort();
  const participantsID = participants.join("_");

  // Load messages on mount or when participantsID changes
  useEffect(() => {
    const fetchMessages = async () => {
      const threadsRef = collection(db, "threads");
      const q = query(
        threadsRef,
        where("participantsID", "==", participantsID)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const messagesData = snapshot.docs[0].data().messages || [];
        setMessages(messagesData);
      } else {
        setMessages([]); // no messages yet
      }
    };

    if (isChatActive) {
      fetchMessages();
    }
  }, [participantsID, isChatActive]);

  const onSendMessage = async () => {
    try {
      if (message.trim() === "") return;

      const msgData = {
        senderId: userData.uid,
        text: message.trim(),
        timestamp: Date.now(),
      };

      const threadsRef = collection(db, "threads");
      const q = query(
        threadsRef,
        where("participantsID", "==", participantsID)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const chatDoc = snapshot.docs[0];
        const chatDocRef = doc(db, "threads", chatDoc.id);

        await updateDoc(chatDocRef, {
          messages: arrayUnion(msgData),
        });
      } else {
        console.log(data.uid);
        const thread = await addDoc(threadsRef, {
          participantsID,
          participants, // Add this here for the new doc
          messages: [msgData],
          createdAt: Date.now(),
        });

        const dermatologistRef = doc(db, "users", data.uid);
        const docSnap = await getDoc(dermatologistRef);
        if (!docSnap.exists()) {
          console.warn("User document does not exist!");
        } else {
          await updateDoc(dermatologistRef, {
            storedMessages: arrayUnion(thread.id),
          });
        }
      }

      // Update UI immediately (optional: you can fetch again from Firestore)
      setMessages((prev) => [...prev, msgData]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const onAddPhoto = () => {
    console.log("Add photo pressed");
  };

  return (
    <Modal
      visible={isChatActive}
      animationType="slide"
      onRequestClose={() => setChatActive(false)}
    >
      {/* Header */}
      <View
        className="bg-primary-100 px-5 py-4 max-h-[80px] gap-5 flex-row justify-start items-center"
        style={{ elevation: 5 }}
      >
        <TouchableOpacity onPress={() => setChatActive(false)}>
          <Ionicons name="caret-back" size={20} color="#2D3B75" />
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-2">
          <Image
            source={{
              uri:
                data.profilePicture ||
                "https://i.ibb.co/hv8xrgQ/default-profile-picture.png",
            }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              objectFit: "cover",
            }}
          />
          <Text
            className="text-dark-800 font-bold"
            style={{ fontWeight: "bold" }}
          >
            Dr. {data.firstName + " " + data.lastName}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 120,
            paddingTop: 20,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {messages.map((mess, index) => {
            //if the message is equals to the id of the other user
            if (mess.senderId == data.uid) {
              return (
                <View
                  className="self-start flex flex-row items-end gap-2"
                  style={{ marginTop: 12 }}
                  key={index}
                >
                  <View>
                    <Image
                      source={{
                        uri:
                          data.profilePicture ||
                          "https://i.ibb.co/hv8xrgQ/default-profile-picture.png",
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 50,
                        objectFit: "cover",
                      }}
                    />
                  </View>
                  <View
                    className="bg-gray-200 min-h-10 px-4 py-5"
                    style={{
                      maxWidth: "75%",
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 0,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <Text className="text-dark-800">{mess.text}</Text>
                  </View>
                </View>
              );
            } else if (mess.senderId == userData.uid) {
               return (
                <View
              className="self-end flex flex-row items-end gap-2"
              style={{ marginTop: 12 }}
              key={index}
            >
              <View
                className="bg-dark-800 min-h-10 px-4 py-5"
                style={{
                  maxWidth: '75%',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 0, // pointy corner
                }}
              >
                <Text className="text-white">{mess.text}</Text>
              </View>
              <View>
                <Image
                  source={{
                    uri:
                      userData.profilePicture ||
                      'https://i.ibb.co/hv8xrgQ/default-profile-picture.png',
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                    objectFit: 'cover',
                  }}
                />
              </View>
            </View>
               )
            }
          })}
        </ScrollView>

        {/* Input bar */}
        <View
          className="bg-white px-4 py-5 flex-row items-center border-t border-gray-300"
          style={{ elevation: 5 }}
        >
          {/* Plus button */}
          <TouchableOpacity onPress={onAddPhoto} className="mr-3">
            <Ionicons name="add-circle-outline" size={30} color="#2D3B75" />
          </TouchableOpacity>

          {/* Message input */}
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            className="flex-1 text-base px-3 py-2 border rounded-full border-dark-800"
            multiline={true}
            maxLength={500}
            style={{ maxHeight: 100 }}
          />

          {/* Send button */}
          <TouchableOpacity
            onPress={onSendMessage}
            disabled={message.trim() === ""}
            className="ml-3 py-2"
          >
            <Ionicons
              name="send"
              size={24}
              color={message.trim() === "" ? "#aaa" : "#2D3B75"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
