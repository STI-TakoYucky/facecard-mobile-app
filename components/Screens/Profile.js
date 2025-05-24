import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux'
import UserProductContainer from '../UserProductContainer';
import StreaksComponent from '../StreaksComponent';
import EditProfile from './EditProfile';
import * as ImagePicker from 'expo-image-picker';
import { updateProfilePicture } from '../../state/userDataSlice/userDataSlice';
import Entypo from '@expo/vector-icons/Entypo';

export default function Profile() {

  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch();
  const [isEditProfile, setEditProfile] = useState(false);

const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert('Permission to access media library is required!');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true,
    quality: 1,
  });

  if (!result.canceled) {
    const { uri, base64 } = result.assets[0];
    await uploadToImgBB(base64);
  }
};


const uploadToImgBB = async (base64) => {
  try {
    const API_KEY = "3b877b2fba08dfee313f6e74e4636fa9"; // Replace this with actual key
    const formData = new FormData();
    formData.append('image', base64);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      console.log("✅ Uploaded to ImgBB:", data.data.url);
      dispatch(updateProfilePicture(data.data.url))
    } else {
      console.log('❌ Upload failed:', data);
    }
  } catch (error) {
    console.error('Upload error:', error);
  }
};

  return (
    <ScrollView className="p-5 mt-1" showsVerticalScrollIndicator={false}>

      { 
      isEditProfile &&
        <EditProfile isEditProfile={isEditProfile} setEditProfile={setEditProfile} userData={userData}></EditProfile>
      }

      <View className="flex flex-col items-center gap-7 bg-slate-200 py-8 rounded-md">
        <View>
          <TouchableOpacity className="relatve" onPress={pickImage}>
              <Image
              source={{ uri: userData.profilePicture || "https://i.ibb.co/hv8xrgQ/default-profile-picture.png" }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                objectFit: "cover"
              }}
            />
            <View className="absolute bg-white p-2 rounded-full top-[4.5rem] right-[-.5rem]">
              <Feather name="edit" size={20} color="#2D3B75"/>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex items-center justify-center gap-3">
         <View className="flex-row flex gap-5">
           <View className="flex flex-row">
            <MaterialIcons name="person" size={24} color="#2D3B75" className="min-w-8"/>
            <Text className="text-lg text-dark-800">{userData.firstName + " " + userData.lastName}</Text>
          </View>
          <View className="flex flex-row">
            <Entypo name="cake" size={20} color="#2D3B75"  className="min-w-8"/>
            <Text className="text-lg text-dark-800">{userData.birthday}</Text>
          </View>
         </View>
          <TouchableOpacity onPress={() => setEditProfile(true)}>
            <Text className="bg-dark-800 text-white text-base max-w-[8rem] py-3 px-[1rem] rounded-md text-center">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <UserProductContainer></UserProductContainer>

    </ScrollView>
  )
}
