import React from 'react';
import { Modal, View, Text, Pressable, Image } from 'react-native';

export default function ImagePreviewModal({
  visible,
  imageUri,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="w-[24rem] bg-white rounded-2xl py-6 px-8 shadow-xl items-center">
          <Text className="text-2xl font-semibold mb-4 text-dark-800">
            Preview Image
          </Text>
          <Image
            source={{ uri: imageUri }}
            className="w-64 h-64 rounded-xl mb-8"
            resizeMode="contain"
          />
          <View className="flex flex-row gap-2 self-end">
            <Pressable onPress={onCancel}>
              <Text className="bg-white border border-dark-800 rounded-md px-4 py-[.49rem] shadow-sm text-dark-800">
                Cancel
              </Text>
            </Pressable>
            <Pressable onPress={onConfirm}>
              <Text className="bg-dark-800 text-white text-base py-2 px-4 rounded-md">
                Send
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
