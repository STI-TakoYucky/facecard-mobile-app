import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Header({ setActiveTab }) {
  return (
    <View className="bg-primary-100 p-5 flex-1 py-2 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-dark-800" onPress={() => {setActiveTab("Map")}}>Facecard</Text>
            <TouchableOpacity>
              <Image source={require('../assets/profile.png')} className="max-w-[2rem] max-h-[2rem] rounded-full"></Image>
            </TouchableOpacity>
    </View>
  )
}