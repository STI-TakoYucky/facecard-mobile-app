import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Header({ setActiveTab, setDrawerActive }) {
  return (
    <View className="bg-primary-100 px-5 max-h-[50px] flex-row justify-between items-center">
            <Text className="text-lg font-bold text-dark-800" onPress={() => {setActiveTab("Map")}}>Facecard</Text>
            <TouchableOpacity onPress={() => {setDrawerActive((prev) => !prev)}}>
              <Image source={require('../assets/profile.png')} className="max-w-[2rem] max-h-[2rem] rounded-full"></Image>
            </TouchableOpacity>
    </View>
  )
}