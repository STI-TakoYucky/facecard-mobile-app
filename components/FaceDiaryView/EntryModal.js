import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image, Pressable  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function EntryModal(props) {

  // OPENS CAMERA
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera permission is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaType.Images,
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
    console.log('Photo selected:', result.assets[0]);
  }
};

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const [text, setText] = useState('');
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
        <TouchableOpacity onPress={props.onClose}>
          <MaterialIcons 
          name="done" 
          size={22} 
          color="162041" />
        </TouchableOpacity>
      </View>

      {/* DATE */}
      <Text style={styles.date}>{currentDate}</Text>

      {/* IMAGE */}
      <View style={styles.container}>
        <Pressable onPress={openCamera}>
          <View style={styles.image}>
            {!imageUri ? 
            (
              <AntDesign name="camerao" size={24} color="black" />
            ) : 
            (
              <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
              />
              )}   
            </View>
          </Pressable>
        <View style={styles.description}>
          <TextInput 
            style={styles.texts}
            multiline={true}
            placeholder="Write your thoughts..."
            value={text}
            onChangeText={setText}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 13,
  },
  image: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 25,
    marginVertical: 15,
    elevation: 15,
    overflow: 'hidden', 
  },
  imageContent: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
    description:{
      backgroundColor: '#eee',
      width: '350',
      marginTop: 15,
      borderRadius: 10
  },
  texts:{
    color: 'black'
  },
  date:{
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});