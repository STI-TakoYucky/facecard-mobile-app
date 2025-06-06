import { View, Text, Modal, Pressable, Platform, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { setSchedules } from "../../state/routineSchedulesSlice/routineSchedulesSlice";
import { generateUniqueId } from "../../utils/GenerateUniqueID";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fonts } from "../../utils/fonts";

export default function AddSchedule({
  isAddSchedule,
  setAddSchedule,
  selectedMarker,
}) {
  const schedulesData = useSelector((state) => state.routineSchedules);
  const selectedSchedule = schedulesData.find((sched) => sched.name === selectedMarker) || [];
  const dispatch = useDispatch();

  const defaultDropdownItems = [
    { label: "Daily", value: "Daily" },
    { label: "Every Sunday", value: 0 },
    { label: "Every Monday", value: 1 },
    { label: "Every Tuesday", value: 2 },
    { label: "Every Wednesday", value: 3 },
    { label: "Every Thursday", value: 4 },
    { label: "Every Friday", value: 5 },
    { label: "Every Saturday", value: 6 },
  ];

  //constants and flags
  const [open, setOpen] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dropdownBoxItem, setdropdownBoxItem] = useState(defaultDropdownItems);

  //reset values on input data every render
  useEffect(() => {
    setTimeGroup([]);
    const filteredItems = defaultDropdownItems.filter(
      (item) =>
        !selectedSchedule.schedules?.some(
          (sched) => sched.dayOfWeek === item.value
        ) && !(item.value === "Daily" && selectedSchedule.schedules?.length > 0)
    );
    setdropdownBoxItem(filteredItems);
    setDropdownBoxValue(filteredItems[0]?.value ?? null);
  }, [isAddSchedule]);

  //values for data to be passed for the global state
  const [timeGroup, setTimeGroup] = useState([]);
  const [dropDownBoxValue, setDropdownBoxValue] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    const formattedTime = new Date(currentTime).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setShowTimePicker(Platform.OS === "ios");
    setTimeGroup((prev) => {
      const updatedTimeGroup = [...prev];
      updatedTimeGroup[currentIndex] = formattedTime;
      return updatedTimeGroup;
    });
  };

  const addNotification = (time) => {
    const formattedTime = new Date(time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setTimeGroup((prev) => {
      return [...prev, formattedTime];
    });
  };

  const deleteNotification = (index) => {
    setTimeGroup((prev) => {
      const updatedTimeGroup = [...prev];
      updatedTimeGroup.splice(index, 1);
      return updatedTimeGroup;
    });
  };

  const handleConfirm = () => {
    const payload = {
      id: generateUniqueId(),
      dayOfWeek: dropDownBoxValue,
      time: timeGroup,
    };
    dispatch(setSchedules({ name: selectedMarker, schedules: payload }));
    setAddSchedule(false);
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isAddSchedule}
      onRequestClose={() => setAddSchedule(false)}
    >
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="w-[24rem] bg-white rounded-2xl py-6 px-[2rem] h-[29rem] shadow-xl justify-between">
            <View>
              <Text className="text-2xl font-semibold text-dark-800" style={[fonts.HeaderFont]}>
                {selectedMarker}
              </Text>
              <View className="my-5 flex gap-3">
                <View className="my-2 gap-[2rem]">
                  <View className="gap-5">
                    <View>
                      <Text className="text-dark-800 mb-2" style={[fonts.BodyFont]}>
                        Which day would you like to track it?
                      </Text>
                      <DropDownPicker
                        style={{
                          borderColor: "#2D3B75",
                          color: "#2D3B75",
                        }}
                        textStyle={{
                          ...fonts.BodyFont,
                          color: "#2D3B75",
                        }}
                        dropDownContainerStyle={{
                          borderColor: "#2D3B75",
                          height: 166,
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
                        setValue={setDropdownBoxValue}
                        setItems={setdropdownBoxItem}
                        closeOnBlur={true}
                      />
                    </View>

                    <View>
                      <View className="flex gap-4">
                        {timeGroup.map((time, index) => {
                          return (
                            <View
                              className="flex flex-row item-center gap-2"
                              key={index}
                            >
                              <View className="flex items-center flex-row gap-3">
                                <TouchableOpacity
                                  onPress={() => {
                                    setShowTimePicker(true);
                                    setCurrentIndex(index);
                                  }}
                                >
                                  <Text className="text-lg text-dark-800 bg-[#E3E7F6] py-[.4rem] px-3 rounded-md" style={[fonts.BodyFont]}>
                                    {time}
                                  </Text>
                                </TouchableOpacity>

                                <Pressable
                                  onPress={() => deleteNotification(index)}
                                >
                                  <AntDesign
                                    name="close"
                                    size={20}
                                    color="#2D3B75"
                                  />
                                </Pressable>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                      {timeGroup.length < 3 && (
                        <Pressable onPress={() => addNotification(new Date())}>
                          <View className="flex flex-row dropdownBoxItem-center gap-2 mt-3 items-center">
                            <Text className="text-dark-800 text-base" style={[fonts.BodyFont]}>
                              Add notifications
                            </Text>
                            <View>
                              <Entypo
                                name="squared-plus"
                                size={24}
                                color="#2D3B75"
                              />
                            </View>
                          </View>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>

                {showTimePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </View>

            <View className="flex flex-row gap-2 justify-end">
              <TouchableOpacity onPress={() => setAddSchedule(false)}>
                <Text className="bg-white border border-dark-800 text-dark-800 rounded-md px-4 py-[.49rem]">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleConfirm()}>
                <Text className="bg-dark-800 text-white text-base py-2 px-4 rounded-md">
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
