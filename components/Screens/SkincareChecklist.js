import { View, Text, Pressable, ScrollView, Modal } from 'react-native'
import React from 'react'

export default function SkincareChecklist({setChecklistActive, isChecklistActive}) {

  return (
    <Modal
        transparent
        animationType="fade"
        visible={isChecklistActive}
        onRequestClose={() => setChecklistActive(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="w-[24rem] h-[20rem] bg-white rounded-2xl py-6 px-[2rem] shadow-xl justify-between">
            <View>
              <Text className="text-2xl font-semibold mb-4 text-dark-800">
                Have you done your skincare today?
              </Text>
              <View className="mt-2">
                <View className="flex flex-row items-center gap-2">
                  <Pressable>
                    <View className="w-[2rem] h-[2rem] border-dark-800 border-[3px] rounded-full"></View>
                  </Pressable>
                  <Text className="text-dark-800 text-base">Moisturizer</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row gap-2 justify-end">
              <Pressable  onPress={() => setChecklistActive(false)}>
                <Text className=" bg-white border border-dark-800 rounded-md px-4 py-[.49rem] shadow-sm">
                  Cancel
                </Text>
              </Pressable>
              <Pressable  onPress={() => setChecklistActive(false)}>
                <Text className="bg-dark-800 text-white text-base py-2 px-4 rounded-md">
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  )
}