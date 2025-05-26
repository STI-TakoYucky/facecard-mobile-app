import { View, Text, Pressable, Image, TouchableWithoutFeedback, Animated, useAnimatedValue, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { fonts } from '../utils/fonts';
import SubscriptionProcess from './Screens/SubscriptionProcess';

export default function DrawerComponent({ setDrawerActive, setLoggedIn, setActiveTab }) {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);
  const slideAnim = useRef(new Animated.Value(250)).current; // Starts off-screen
  const [isPremiumSubProcess, setPremiumSubProcess] = useState(false)
  const isUserUser = userData.role === "User"
  const isUserDerma = userData.role === "Dermatologist"

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 250,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setDrawerActive(false);
      }, 500);
    });
  };

  useEffect(() => {
    slideIn()
  }, [])

  const handleLogout = () => {
    setLoggedIn(prev => !prev); 
    setDrawerActive(prev => !prev); 
    dispatch({ type: 'user/logout' });
    setActiveTab("Home")
  }


const renderDermaChat = () => {
    if( isPremiumSubProcess && !userData.isPremiumAcc && isUserUser ) {
      return <SubscriptionProcess setDrawerActive={setDrawerActive} isPremiumSubProcess={isPremiumSubProcess} setPremiumSubProcess={setPremiumSubProcess}></SubscriptionProcess>
    }
}

const handleDermaChatOnPress = () => {
  if (!userData.isPremiumAcc && isUserUser) {
    // Just open the SubscriptionProcess and keep the drawer open
    setPremiumSubProcess(true);
  } else if (userData.isPremiumAcc === true && isUserUser) {
    setActiveTab("Chat");
    slideOut();
  } else if (isUserDerma) {
    setActiveTab("Chat");
    slideOut();
  }
};



  return (
    <View className="absolute inset-0 z-50 flex-row">

      {renderDermaChat()}
      
      {/* This is the semi-transparent overlay */}
      <TouchableWithoutFeedback onPress={() => { slideOut()}}>
        <View className="flex-1 bg-black/0" />
      </TouchableWithoutFeedback>

      {/* This is the drawer itself */}
      <Animated.View style={{ elevation: 500, position:"relative",transform: [{ translateX: slideAnim }] }} className="px-7 py-10 h-full w-[16rem] bg-white">
        <View className="flex flex-row gap-2">
           <Image source={{uri: userData.profilePicture || "https://i.ibb.co/hv8xrgQ/default-profile-picture.png"}} 
              style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            objectFit: "cover"
          }}
          ></Image>
          <Text className="text-dark-800 text-xl break-words" style={[fonts.HeaderFont]}>{userData.firstName + " " + userData.lastName}</Text>
        </View>

        <View className="flex gap-8 mt-10">
          <TouchableOpacity className="flex flex-row gap-2 justify-start" onPress={() => {setActiveTab("Profile"); slideOut()}}>
            <MaterialIcons name="person" size={24} color="#2D3B75" className="min-w-8"/>
            <Text className="text-dark-800 text-lg" style={[fonts.BodyFont]}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex justify-start flex-row gap-2 items-center" onPress={() => handleDermaChatOnPress()}>
            <FontAwesome6 name="user-doctor" size={19} color="#2D3B75" className="min-w-7 ml-[.2rem]"/>
            <Text className="text-dark-800 text-lg" style={[fonts.BodyFont]}>Derma Chat</Text>
            <FontAwesome5 name="crown" size={15} color="#f2c611" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {handleLogout()}} className="justify-start flex flex-row gap-2">
            <MaterialCommunityIcons name="logout" size={24} color="#2D3B75" className="min-w-8"/>
            <Text className="text-dark-800 text-lg" style={[fonts.BodyFont]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
    </View>
  );
}
