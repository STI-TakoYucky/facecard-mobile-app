import { View, Text, Pressable, ScrollView, Modal } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import React from 'react'

export default function SkincareChecklist({setEditChecklist, isEditChecklistActive}) {
  return (
    <Modal
        transparent
        animationType="fade"
        visible={isEditChecklistActive}
        onRequestClose={() => setEditChecklist(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="w-72 bg-white rounded-2xl p-6 shadow-xl">
            <Text className="text-lg font-semibold mb-4">
              Edit checklist
            </Text>
            <View className="flex flex-row items-center">
              <CheckBox
                value={true}
                onValueChange={false}
                tintColors={{ true: "#2563eb", false: "#d1d5db" }}
              />
              <Text>Moisturizer</Text>
            </View>
            <Pressable
              onPress={() => setEditChecklist(false)}
              className="bg-red-500 px-4 py-2 rounded-lg mt-2"
            >
              <Text className="text-white text-center font-medium">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
}