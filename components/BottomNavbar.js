import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SkincareBottle from '../assets/skincare-bottle.svg'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { fonts } from '../utils/fonts';

export default function BottomNavbar({activeTab, setActiveTab }) {
    
  return (
    <View className="bg-primary-100 flex p-5 flex-row relative justify-between items-center">

    <TouchableOpacity onPress={() => setActiveTab("Home")}>
      <View className="flex items-center">
        <FontAwesome6 name="house-chimney" size={22} color={activeTab === "Home" ? "#2D3B75" : "#DF9595"}/>
      </View>
    </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Skincare")}>
        <View className="flex items-center">
            <SkincareBottle width={25} height={25} color={activeTab === "Skincare" ? "#2D3B75" : "#DF9595"}></SkincareBottle>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Map")}>
        <View className="flex items-center">
            <FontAwesome6 name="location-pin" size={25} color={activeTab === "Map" ? "#2D3B75" : "#DF9595"}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Routines")}>
        <View className="flex items-center">
            <FontAwesome5 name="calendar-week" size={22} color={activeTab === "Routines" ? "#2D3B75" : "#DF9595"}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab("Face Diary")}>
        <View className="flex items-center">
        <FontAwesome5 name="book" size={22} color={activeTab === "Face Diary" ? "#2D3B75" : "#DF9595"}/>
        </View>
      </TouchableOpacity>
      
    </View>
  )
}