import React from 'react';
import { Modal, View, Text, Pressable, Image } from 'react-native';

export default function ImageClickedModal({ isImageClicked, imageUri, setImageClicked }) {
  return (
    <Modal
      visible={isImageClicked}
      transparent
      animationType="fade"
      onRequestClose={() => setImageClicked(false)}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
          <Image
            source={{ uri: imageUri }}
            className="rounded-xl mb-8"
            style={{
              maxWidth: 550,
              maxHeight: 550,
              minWidth: 550,
              minHeight: 550
            }}
            resizeMode="contain"
          />
      </View>
    </Modal>
  );
}
