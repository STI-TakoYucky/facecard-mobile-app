import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View className="bg-primary-100 p-5 flex flex-row justify-between items-center">
            <Text className="text-lg font-bold text-dark-900">Facecard</Text>
            <Image source={require('../assets/profile.png')} className="max-w-[2rem] max-h-[2rem] rounded-full"></Image>
    </View>
  )
}