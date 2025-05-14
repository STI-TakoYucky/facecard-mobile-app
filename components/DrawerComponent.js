import { View, Text, Pressable, Image, TouchableWithoutFeedback, Animated, useAnimatedValue, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function DrawerComponent({ setDrawerActive, setLoggedIn }) {
  const slideAnim = useRef(new Animated.Value(250)).current; // Starts off-screen

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


  return (
    <View className="absolute inset-0 z-50 flex-row">
      
      {/* This is the semi-transparent overlay */}
      <TouchableWithoutFeedback onPress={() => { slideOut()}}>
        <View className="flex-1 bg-black/0" />
      </TouchableWithoutFeedback>

      {/* This is the drawer itself */}
      <Animated.View style={{ elevation: 500, position:"relative",transform: [{ translateX: slideAnim }] }} className="px-7 py-10 h-full w-[16rem] bg-white">
        <View className="flex flex-row gap-2">
          <Image
            source={require('../assets/profile.png')}
            className="max-w-[2rem] max-h-[2rem] rounded-full"
          />
          <Text className="font-bold text-dark-800 text-2xl">Lucky Estrada</Text>
        </View>

        <View className="flex gap-8 mt-10">
          <TouchableOpacity className="flex flex-row gap-2 justify-start">
            <MaterialIcons name="person" size={24} color="#2D3B75" className="min-w-7"/>
            <Text className="text-dark-800 text-lg">Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex justify-start flex-row gap-2 items-center">
            <FontAwesome6 name="user-doctor" size={19} color="#2D3B75" className="min-w-7"/>
            <Text className="text-dark-800 text-lg">Derma Chat</Text>
            <FontAwesome5 name="crown" size={16} color="#f2c611" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {setLoggedIn(prev => !prev); setDrawerActive(prev => !prev)}} className="justify-start flex flex-row gap-2">
            <MaterialCommunityIcons name="logout" size={24} color="#2D3B75" className="min-w-7"/>
            <Text className="text-dark-800 text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
    </View>
  );
}
