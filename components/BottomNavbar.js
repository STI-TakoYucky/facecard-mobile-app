import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SkincareBottle from '../assets/skincare-bottle.svg'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function BottomNavbar({activeTab, setActiveTab }) {
    
  return (
    <View className="bg-primary-100 flex p-5 flex-row relative justify-between items-center">

    <TouchableOpacity onPress={() => setActiveTab("Home")}>
      <View className="flex items-center mr-6">
        <FontAwesome6 name="house-chimney" size={20} color={activeTab === "Home" ? "#2D3B75" : "#DF9595"}/>
        <Text className="text-sm">Home</Text>
      </View>
    </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Skincare")}>
        <View className="flex items-center">
            <SkincareBottle width={29} height={23} color={activeTab === "Skincare" ? "#2D3B75" : "#DF9595"}></SkincareBottle>
            <Text className="text-sm">Skincare</Text>
        </View>
      </TouchableOpacity>
      
      
        <View className="flex items-center relative w-[6.5rem]">
          <View className="bg-white rounded-full h-[81px] p-3 absolute -bottom-1">
          <TouchableOpacity>
              <AntDesign name="pluscircle" size={60} color={"#2D3B75"} />
          </TouchableOpacity>
          </View>
        </View>
      

      <TouchableOpacity onPress={() => setActiveTab("Routines")}>
        <View className="flex items-center">
            <FontAwesome5 name="calendar-week" size={20} color={activeTab === "Routines" ? "#2D3B75" : "#DF9595"}/>
            <Text className="text-sm">Routines</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Face Diary")}>
        <View className="flex items-center">
        <FontAwesome5 name="book" size={20} color={activeTab === "Face Diary" ? "#2D3B75" : "#DF9595"}/>
            <Text className="text-sm">Face Diary</Text>
        </View>
      </TouchableOpacity>
      
    </View>
  )
}