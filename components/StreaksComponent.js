import { View, Text } from 'react-native'
import React from 'react'

export default function StreaksComponent() {
  return (
    <View className="items-center justify-center mt-10 ">
        <View className=" w-[7rem] h-[7rem] rounded-full bg-dark-800 flex items-center justify-center">
            <Text className=" text-white font-bold text-[3rem]">1</Text>    
        </View>    
        <Text className=" text-lg font-bold text-dark-900 pt-3 pb-5">Day Streak!</Text>
        <Text className="text-center text-lg text-dark-900">You have been doing your skincare for 1 day! Keep on going to achieve your skincare goals!</Text>
    </View>
  )
}