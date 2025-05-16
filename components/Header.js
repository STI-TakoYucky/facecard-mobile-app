import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Header({ setActiveTab, setDrawerActive }) {

  const userData = useSelector(state => state.userData)

  return (
    <View className="bg-primary-100 px-5 py-4 max-h-[50px] flex-row justify-end items-center">
            <TouchableOpacity onPress={() => {setDrawerActive((prev) => !prev)}}>
              <Image source={{uri: userData.profilePicture || "https://i.ibb.co/hv8xrgQ/default-profile-picture.png"}} 
                 style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                objectFit: "cover"
              }}
              ></Image>
            </TouchableOpacity>
    </View>
  )
}