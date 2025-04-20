import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

export default function UserProductsCard() {
  return (
    <Pressable>
      <View className="shadow-lg flex-row flex  items-center bg-white w-[23rem] rounded-lg h-[12rem] mr-5 ml-2 pb-4">
        <View>
        <Image source={require('../assets/celeteque_sunscreen.png')} className="w-[10rem] h-[10rem]"></Image>
        </View>
        <View>
          <Text className="text-wrap max-w-[13rem] font-bold text-dark-800">Celeteque Dermo Science Skin Defense</Text>
          <Text className="text-wrap max-w-[13rem] text-dark-900 pb-3 pt-1">Celeteque</Text>
          <Text className="text-wrap max-w-[13rem] text-dark-900">100ml</Text>
          <Text className="text-wrap max-w-[13rem] underline text-dark-800 font-bold pt-3">More Details</Text>
        </View>
      </View>
    </Pressable>
      
  )
}