import { View, Text } from 'react-native'
import React from 'react'

export default function StreaksComponent({userDataStreak}) {
  return (
    <View className="items-center justify-center mt-[2rem] mb-[4rem]">
        <View className=" w-[7rem] h-[7rem] rounded-full bg-dark-800 flex items-center justify-center">
            <Text className=" text-white font-bold text-[3rem]">{userDataStreak}</Text>    
        </View>    
        <Text className=" text-lg font-bold text-dark-900 pt-3 pb-5">Day Streak!</Text>
        <Text className="text-center text-lg text-dark-900">You have been doing your skincare for {userDataStreak} {userDataStreak > 1 ? "days": "day"}! Keep on going to achieve your skincare goals!</Text>
    </View>
  )
}