import { View, Text, Modal, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch } from 'react-redux';
import { setSchedules } from "../../state/routineSchedulesSlice/routineSchedulesSlice";
import { generateUniqueId } from "../../utils/GenerateUniqueID";

export default function AddSchedule({ isAddSchedule, setAddSchedule, selectedMarker }) {

  const dispatch = useDispatch();

  //constants and flags
  const [open, setOpen] = useState(false);
  const [showTimeBtn, setShowTimeBtn] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dropdownBoxItem, setdropdownBoxItem] = useState([
    { label: "Daily", value: "Daily" },
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
  ]);

  //values for data
  const id = generateUniqueId();
  const [time, setTime] = useState([new Date()]);
  const [dropDownBoxValue, setDropdownBoxValue] = useState("Daily");
  const formattedTime = time.map((item) => 
    new Date(item).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  )

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const handleConfirm = () => {
    const payload = {
      id: id,
      dayOfWeek: dropDownBoxValue,
      time: formattedTime,
    }
    dispatch(setSchedules({name: selectedMarker, schedules: payload}))
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
              <View className="my-2 gap-[2rem]">
                <View className="gap-5 h-[12rem]">
                  <View>
                    <Text className="text-dark-800 mb-2">Select a Frequency</Text>
                    <DropDownPicker
                      style={{
                        borderColor: "#2D3B75", 
                        color: "#2D3B75",
                      }}
                      textStyle={{
                        color: "#2D3B75", 
                      }}
                      dropDownContainerStyle={{
                        borderColor: "#2D3B75",
                        height:166
                      }}
                      listItemLabelStyle={{
                        color: "#2D3B75", 
                      }}
                      selectedItemLabelStyle={{
                        color: "#2D3B75", 
                        fontWeight: "bold",
                      }}
                      selectedItemContainerStyle={{
                        backgroundColor: "#E3E7F6", 
                      }}
                      placeholderStyle={{
                        color: "#2D3B75", 
                      }}
                      open={open}
                      value={dropDownBoxValue}
                      items={dropdownBoxItem}
                      setOpen={setOpen}
                      setValue={setDropdownBoxValue} // Corrected this line
                      setItems={setdropdownBoxItem}
                    />
                  </View>

                  <Pressable onPress={() => showTimeBtn ? setShowTimeBtn(false) : setShowTimeBtn(true)}>
                    <View className="flex flex-row dropdownBoxItem-center gap-2">
                      <View
                        className={`w-[2rem] h-[2rem] border-dark-800 ${showTimeBtn && 'bg-dark-800'} border-[3px] rounded-full`}
                      ></View>
                      <Text className="text-dark-800 text-base">
                        Receive a notification?
                      </Text>
                    </View>
                  </Pressable>

                  {
                    showTimeBtn && (
                      <View className="flex flex-row dropdownBoxItem-center gap-2">
                        <Pressable onPress={() => setShowTimePicker(true)}>
                          <Text className="text-lg text-dark-900 bg-[#E3E7F6] py-[.4rem] px-3 rounded-md">
                            {formattedTime}
                          </Text>
                        </Pressable>
                      </View>
                    )
                  }

                </View>
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
            <Pressable onPress={() => alert(dropDownBoxValue+ "time" + formattedTime + id)}>
              <Text className="bg-white border border-dark-800 rounded-md px-4 py-[.49rem] shadow-sm">
                Cancel
              </Text>
            </Pressable>
            <Pressable onPress={() => handleConfirm()}>
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
