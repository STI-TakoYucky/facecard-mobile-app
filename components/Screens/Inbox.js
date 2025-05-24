import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fonts } from '../../utils/fonts';
import { getDermatologists } from '../../firebase/db';
import ChatInterface from './ChatInterface';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export default function Inbox() {
  const userData = useSelector(state => state.userData);
  const [chatPartners, setChatPartners] = useState([]);
  const [isChatActive, setChatActive] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState();
  const [latestMessages, setLatestMessages] = useState({});


 useEffect(() => {
  const fetchChatPartners = async () => {
    if (userData.role === "User") {
      const dermatologists = await getDermatologists();
      setChatPartners(dermatologists);
    } else if (userData.role === "Dermatologist") {
        try {
                  const storedMessages = Array.isArray(userData.storedMessages) ? userData.storedMessages : [];
        const partnerList = [];

        for (const threadId of storedMessages) {
          const threadRef = doc(db, "threads", threadId);
          const threadSnap = await getDoc(threadRef);

          if (threadSnap.exists()) {
            const threadData = threadSnap.data();
            const otherUserId = threadData.participants.find(uid => uid !== userData.uid);

            const otherUserRef = doc(db, "users", otherUserId);
            const otherUserSnap = await getDoc(otherUserRef);

            if (otherUserSnap.exists()) {
              partnerList.push({ ...otherUserSnap.data(), uid: otherUserId });
            }
          }
        }

        setChatPartners(partnerList);
        } catch (error) {
          console.log(error)
        }

      }
    }

  fetchChatPartners();
}, []);

  useEffect(() => {
    if (!chatPartners.length) return;

    const fetchLatestMessages = async () => {
      const threadsRef = collection(db, "threads");
      const newLatestMessages = {};

      for (const doc of chatPartners) {
        const participants = [userData.uid, doc.uid].sort();
        const participantsID = participants.join("_");

        const q = query(threadsRef, where("participantsID", "==", participantsID));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const messages = snapshot.docs[0].data().messages || [];
          if (messages.length > 0) {
            messages.sort((a, b) => b.timestamp - a.timestamp);
            newLatestMessages[participantsID] = messages[0];
          }
        }
      }

      setLatestMessages(newLatestMessages);
    };

    fetchLatestMessages();
  }, [chatPartners]);

  const handleChatOnPress = (person) => {
    setChatActive(true);
    setSelectedPerson(person);
  };

  const getDisplayName = (person) => {
    return userData.role === "User"
      ? `Dr. ${person.firstName} ${person.lastName}`
      : `${person.firstName} ${person.lastName}`;
  };

  return (
    <ScrollView className="p-5">
      {isChatActive && (
        <ChatInterface
          selectedPerson={selectedPerson}
          isChatActive={isChatActive}
          setChatActive={setChatActive}
          userData={userData}
        />
      )}

      <Text className="text-dark-800 text-2xl mb-3" style={[fonts.openSansBold]}>
        {userData.role === "User" ? "Dermatologist Chat" : "User Chats"}
      </Text>

      {chatPartners.map((doc, index) => {
        const participants = [userData.uid, doc.uid].sort();
        const participantsID = participants.join("_");
        const latestMsg = latestMessages[participantsID];

        return (
          <TouchableOpacity onPress={() => handleChatOnPress(doc)} key={index}>
            <View className="flex flex-row gap-2 bg-slate-200 p-3 rounded-lg mb-3">
              <Image
                source={{ uri: doc.profilePicture || "https://i.ibb.co/hv8xrgQ/default-profile-picture.png" }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  objectFit: "cover",
                }}
              />
              <View className="flex justify-center">
                <Text className="mb-1 text-dark-800">{getDisplayName(doc)}</Text>
                {!latestMsg?.isImage ? 
                  <Text className="text-gray-400" numberOfLines={1}>
                  {latestMsg
                    ? `${latestMsg.senderId === userData.uid ? "You:" : doc.firstName + ":"} ${latestMsg.text}`
                    : "No messages yet"}
                </Text> :
                  <Text className="text-gray-400" numberOfLines={1}>
                  {latestMsg
                    ? `${latestMsg.senderId === userData.uid ? "You:" : doc.firstName + ":"} Sent a photo.`
                    : "No messages yet"}
                </Text>
                }
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
