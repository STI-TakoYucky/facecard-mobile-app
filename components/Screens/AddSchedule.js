import { View, Text, Modal, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from 'react-native-element-dropdown';

export default function AddSchedule({ isAddSchedule, setAddSchedule }) {
  DropDownPicker.displayName = 'DropDownPicker';
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const formattedTime = new Date(time).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios"); // On Android, hide after picking
    setTime(currentTime);
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isAddSchedule}
      onRequestClose={() => setAddSchedule(false)}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="w-[24rem] bg-white rounded-2xl py-6 px-[2rem] shadow-xl justify-between">
          <View>
            <Text className="text-2xl font-semibold text-dark-800">
              Cleanser
            </Text>
            <View className="my-5 flex gap-3">
              <View className="my-2 gap-[1.5rem]">
                <DropDownPicker
                  style={{
                    width: 200,
                    height: 50,
                    borderColor: "#000",
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                  placeholder="Select an item"
                  data={items}
                  value={selectedItem}
                  onChange={(item) => setSelectedItem(item.value)}
                />
              </View>

              <View className="flex flex-row items-center gap-2">
                <Pressable onPress={() => setShowTimePicker(true)}>
                  <Text className="bg-dark-800 text-white text-base py-2 px-4 rounded-md">
                    Set Time
                  </Text>
                </Pressable>
                <Text className="text-lg text-dark-900 bg-gray-200 py-[.4rem] px-3 rounded-md">
                  {formattedTime}
                </Text>
              </View>

              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
          <View className="flex flex-row gap-2 justify-end mt-3">
            <Pressable onPress={() => setAddSchedule(false)}>
              <Text className="bg-white border border-dark-800 rounded-md px-4 py-[.49rem] shadow-sm">
                Cancel
              </Text>
            </Pressable>
            <Pressable>
              <Text className="bg-dark-800 text-white text-base py-2 px-4 rounded-md">
                Confirm
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
