import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { fonts } from '../../utils/fonts'

export default function Inbox() {

  const userData = useSelector(state => state.userData)

  return (
    <ScrollView className="p-5">

      <Text className="text-dark-800 text-2xl mb-3" style={[fonts.openSansBold]}>Dermatologist Chat</Text>

      <TouchableOpacity>
      <View className="flex flex-row gap-2 bg-slate-200 p-3 rounded-lg mb-3">
           <Image source={{uri: userData.profilePicture || "https://i.ibb.co/hv8xrgQ/default-profile-picture.png"}} 
              style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            objectFit: "cover"
          }}
          ></Image>
          <View className="flex justify-center">
            <Text className="mb-1 text-dark-800">
              Dr. Valentino
            </Text>
            <Text className=" text-gray-400">
              Dermatologist Name: How is your ski...
            </Text>
          </View>
      </View>
      </TouchableOpacity>
      
            <View className="flex flex-row gap-2 bg-slate-200 p-3 rounded-lg mb-3">
           <Image source={{uri: userData.profilePicture || "https://i.ibb.co/hv8xrgQ/default-profile-picture.png"}} 
              style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            objectFit: "cover"
          }}
          ></Image>
          <View className="flex justify-center">
            <Text className="mb-1 text-dark-800">
              Dermatologist Name
            </Text>
            <Text className=" text-gray-400">
              Dermatologist Name: Hi! Good Day Ipi...
            </Text>
          </View>
      </View>

            <View className="flex flex-row gap-2 bg-slate-200 p-3 rounded-lg mb-3">
           <Image source={{uri: userData.profilePicture || "https://i.ibb.co/hv8xrgQ/default-profile-picture.png"}} 
              style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            objectFit: "cover"
          }}
          ></Image>
          <View className="flex justify-center">
            <Text className="mb-1 text-dark-800">
              Dermatologist Name
            </Text>
            <Text className=" text-gray-400">
              Dermatologist Name: Hi! Good Day Ipi...
            </Text>
          </View>
      </View>

      
      
    </ScrollView>
  )
}