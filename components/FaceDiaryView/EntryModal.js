import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image, Pressable  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function EntryModal(props) {

  // OPENS CAMERA
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera permission is required!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log('Taken image:', result.assets[0]);
    }
    
  };

// OPENS GALLERY
const openGallery = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission needed', 'Gallery access is required');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync();
  if (!result.canceled) {
    setImageUri(result.assets[0].uri);
    console.log('Photo selected:', result.assets[0]);
  }
};

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const [title, setTitle] = useState('');
  const [mainText, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const removeImage = () => {
    setImageUri(null);
  }

  return (
    <Modal
    visible={props.visible}
    animationType="slide"
    onRequestClose={props.onClose}
    >
      <View style={styles.header}> 
        <TouchableOpacity onPress={props.onClose}>
          <Ionicons 
            name="arrow-back-sharp" 
            size={22} 
            color='#162041' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (!title && !mainText && !imageUri) {
            console.warn("All fields are empty");
            props.onClose();
            return;
          }
          if (!props.onSubmit) {
            console.warn("onSubmit prop is missing!");
            return;
          }
          props.onSubmit({
            date: currentDate,
            imageUri,
            title,
            mainText,
          });
          setTitle('');
          setText('');
          setImageUri(null);
        }}>
          <MaterialIcons 
          name="done" 
          size={22} 
          color="#162041" />
        </TouchableOpacity>
      </View>

      {/* DATE */}
      <Text style={styles.date}>{currentDate}</Text>

      {/* IMAGE VIEW */}
      <View style={styles.imageView}>
        <Pressable onPress={openGallery}>
          <View style={styles.imageContainer}>
            {!imageUri ? 
            (
              <AntDesign name="camerao" size={24} color="black" />
            ) : 
            (
              <Image
              source={{ uri: imageUri }}
              style={styles.imageContent}
              resizeMode="cover"
              />
              )}   
            </View>
          </Pressable>

          {/* HAS AN IMAGE, SHOWS REPLACE AND REMOVE BUTTON */}
            {imageUri && (
            <View style={styles.imageActions}>
              <TouchableOpacity onPress={openCamera}>
                <MaterialCommunityIcons name="camera-retake" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={removeImage}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
            )}
        </View>

        {/* DESCRIPTION */}
        <View style={styles.description} className="mt-6">
          <View className="p-2">
            <TextInput
            style={styles.texts}
            multiline={true}
            numberOfLines={5}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          </View>
        </View>
        <View style={styles.description} className="mt-3">
          <View className="p-2 h-72">
            <TextInput 
            multiline={true}
            placeholder="Write your thoughts..."
            value={mainText}
            onChangeText={setText}
          />
          </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  imageView:{
    alignSelf: 'center'
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 13,
  },
  imageContainer: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 25,
    marginVertical: 15,

    elevation: 15,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  description:{
    alignSelf: 'center',
    backgroundColor: '#eee',
    width: '350',
    borderRadius: 10,

    elevation: 10
  },
  texts:{
    fontWeight: 'bold',
    fontSize: 17
  },
  date:{
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  imageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});