import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function StartingAd({ setStartingAdAlreadyFired }) {

  return (
    <View className="absolute w-full h-full z-50">
      <View className="flex-1 bg-black/40 justify-center items-center">
      <TouchableOpacity className="absolute z-50" style={{top: 175, right: 40}} onPress={() => setStartingAdAlreadyFired(true)}>
        <View>
            <AntDesign name="closecircle" size={25} color="white" />
        </View>
      </TouchableOpacity>
          <Image
            source={require("../assets/StartingAd.jpg")}
            className="rounded-xl mb-8"
            style={{
              maxWidth: 330,
              maxHeight: 330,
              minWidth: 330,
              minHeight: 330,
              borderRadius: 5
            }}
          />
      </View>
    </View>
  );
}
