import { View, Text } from 'react-native'
import React from 'react'
import { fonts } from '../utils/fonts'

export default function StreaksComponent({userDataStreak}) {
  return (
    <View className="items-center justify-center" style={{
      marginBottom: 30,
      marginTop: 60
    }}>
        <View className=" w-[7rem] h-[7rem] rounded-full bg-dark-800 flex items-center justify-center">
            <Text className=" text-white text-[3rem] mt-2" style={[fonts.HeaderFont]}>{userDataStreak}</Text>    
        </View>    
        <Text className=" text-lg font-bold text-dark-800 pt-3 pb-5" style={[fonts.HeaderFont]}>Day Streak!</Text>
        <Text className="text-center text-base text-dark-800" style={[fonts.BodyFont]}>You have been doing your skincare for {userDataStreak} {userDataStreak > 1 ? "days": "day"}! Keep on going to achieve your skincare goals!</Text>
    </View>
  )
}