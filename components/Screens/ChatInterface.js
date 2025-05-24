import { View, Text, Modal, TouchableOpacity, Image, TextInput, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, query, where, getDocs, addDoc, updateDoc, doc, arrayUnion, getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import * as ImagePicker from 'expo-image-picker';
import ImagePreviewModal from "./ImagePreviewModal";
import ImageClickedModal from "./ImageClickedModal";

export default function ChatInterface({ selectedPerson, isChatActive, setChatActive, userData,}) {
  const data = selectedPerson;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const [isImageClicked, setImageClicked] = useState(false)
  const participants = [data.uid, userData.uid].sort();
  const participantsID = participants.join("_");

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
        setMessages([]);
      }
    };

    if (isChatActive) {
      fetchMessages();
    }
  }, [participantsID, isChatActive]);


    //=== PUSH MESSAGES TO DATABASE ===///
    const pushToDB = async (msgData) => {
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
    }


  //=== SEND TEXT MESSAGES ===//
  const onSendMessage = async () => {
    try {
      if (message.trim() === "") return;

      const msgData = {
        senderId: userData.uid,
        text: message.trim(),
        isImage: false,
        timestamp: Date.now(),
      };

      pushToDB(msgData)
     
    } catch (error) {
      console.log(error);
    }
  };

 
//=== SEND IMAGES ===//
 const pickImage = async () => {
   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
 
   if (!permissionResult.granted) {
     alert('Permission to access media library is required!');
     return;
   }
 
   const result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     base64: true,
     quality: 1,
   });
 
   if (!result.canceled) {
     const { uri, base64 } = result.assets[0];
      setSelectedImageUri(uri);
      setSelectedImageBase64(base64);
      setPreviewVisible(true); // Show preview modal
   }
 };
 
 const uploadToImgBB = async (base64) => {
   try {
     const API_KEY = "3b877b2fba08dfee313f6e74e4636fa9"; 
     const formData = new FormData();
     formData.append('image', base64);
 
     const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
       method: 'POST',
       body: formData,
     });
 
     const data = await response.json();
     if (data.success) {
       console.log("✅ Uploaded to ImgBB:", data.data.url);
       const msgData = {
        senderId: userData.uid,
        text: data.data.url,
        isImage: true,
        timestamp: Date.now(),
      };

      pushToDB(msgData)
     } else {
       console.log('❌ Upload failed:', data);
     }
   } catch (error) {
     console.error('Upload error:', error);
   }
 };
 
  

  return (
    <Modal
      visible={isChatActive}
      animationType="slide"
      onRequestClose={() => setChatActive(false)}
    >

    <ImagePreviewModal
      visible={previewVisible}
      imageUri={selectedImageUri}
      onCancel={() => setPreviewVisible(false)}
      onConfirm={() => {
        uploadToImgBB(selectedImageBase64);
        setPreviewVisible(false);
      }}
    />

    <ImageClickedModal
      isImageClicked={isImageClicked}
      imageUri={selectedImageUri}
      setImageClicked={setImageClicked}
    >

    </ImageClickedModal>

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
                    { mess.isImage == false ? <Text className="text-dark-800">{mess.text}</Text>: 
                    <Pressable onPress={() => {setImageClicked(true); setSelectedImageUri(mess.text)}}>
                      <Image
                        source={{
                          uri: mess.text
                        }}
                        style={{
                        width: 140,
                        height: 140,
                        borderRadius: 2
                      }}
                      />
                    </Pressable>
                    }
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
                { mess.isImage == false ? <Text className="text-white">{mess.text}</Text>: 
                <Pressable onPress={() => {setImageClicked(true); setSelectedImageUri(mess.text)}}> 
                  <Image
                    source={{
                      uri: mess.text
                    }}
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 2
                    }}
                  />
                </Pressable>
                  }
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
          <TouchableOpacity onPress={pickImage} className="mr-3">
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
