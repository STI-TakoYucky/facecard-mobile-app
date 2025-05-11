import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function DrawerComponent() {
  return (
    <View style={{elevation:500}} className="px-7 py-10 h-full absolute right-0 w-[20rem] bg-white z-50">
      
      <View className="flex flex-row gap-2">
        <Image source={require('../assets/profile.png')} className="max-w-[2rem] max-h-[2rem] rounded-full"></Image>
        <Text className="font-bold text-dark-800 text-2xl">Lucky Estrada</Text>
      </View>

      <View className="flex gap-8 mt-10">
        <Pressable className="flex flex-row gap-2">
            <MaterialIcons name="person" size={24} color="#2D3B75" />
            <Text className="text-dark-800 text-lg">
                Profile
            </Text>
        </Pressable>

        <Pressable className="flex flex-row gap-2">
            <MaterialCommunityIcons name="logout" size={24} color="#2D3B75" />
            <Text className="text-dark-800 text-lg">
                Logout
            </Text>
        </Pressable>
      </View>
    </View>
  )
}