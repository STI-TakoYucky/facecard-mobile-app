import { View, Text, ScrollView, Pressable, Modal } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import StreaksComponent from "../StreaksComponent";
import UserProductContainer from "../UserProductContainer";
import SkincareChecklist from "../Screens/SkincareChecklist";
import EditChecklist from "../Screens/EditChecklist";

export default function Home() {
  const [markedDates, setMarkedDates] = useState({
    "2025-04-28": {
      isMarked: true,
      dots: [
        { key: "vacation", color: "#8A9A5B", selectedDotColor: "blue" },
        { key: "vacation", color: "#8A9A5B", selectedDotColor: "blue" },
        { key: "vacation", color: "#8A9A5B", selectedDotColor: "blue" },
        { key: "vacation", color: "#8A9A5B", selectedDotColor: "blue" },
      ],
    },
    "2025-04-29": {
      isMarked: true,
      dots: [
        { key: "vacation", color: "#8A9A5B", selectedDotColor: "blue" },
        { key: "vacation", color: "#8A9A5B", selectedDotColor: "blue" },
        { key: "vacation", color: "#8A9A5B", selectedDotColor: "blue" },
        { key: "vacation", color: "#8A9A5B", selectedDotColor: "blue" },
      ],
    },
  });

  const [isChecklistActive, setChecklistActive] = useState(false);
  const [isEditChecklistActive, setEditChecklist] = useState(false);

  const renderDay = (day) => {
    return (
      <View>
        <Text className="text-base text-dark-900">{day.day}</Text>
      </View>
    );
  };

  const HandleDayClick = (date, isMarked) => {

    if (isMarked) {
      setEditChecklist(true)
      return
    }

    setChecklistActive(true);
    setMarkedDates((prev) => ({
      ...prev,
      [date]: { isMarked: true },
    }));
  };

  return (
    <ScrollView className={`p-5 text-dark-900`}>

      <SkincareChecklist setChecklistActive={setChecklistActive} isChecklistActive={isChecklistActive}></SkincareChecklist>
      <EditChecklist setEditChecklist={setEditChecklist} isEditChecklistActive={isEditChecklistActive}></EditChecklist>

      <Calendar
        markingType={"custom"}
        markedDates={markedDates}
        dayComponent={({ date, state }) => {
          const dayData = markedDates[date?.dateString] || {};
          const dots = dayData.dots || [];
          const isMarked = dayData.isMarked;

          return (
            <Pressable
              onPress={() => HandleDayClick(date?.dateString, isMarked)}
              disabled={state === "disabled" ? true : false}
            >
              <View
                className={`h-[3rem] w-[3rem] flex items-center justify-center ${
                  isMarked ? "bg-dark-800" : ""
                } ${
                  state === "disabled" ? "" : "border-dark-800 border-[3px]"
                } rounded-full`}
              >
                <Text
                  className={`
                  text-base
                  font-bold
                  ${state === "disabled" ? "text-gray-300" : "text-dark-800"}
                  ${isMarked && "text-white"}`}
                >
                  {date?.day}
                </Text>
              </View>
              <View className="flex items-center justify-center min-h-2 mt-2 flex-row gap-1">
                {dots.map((dot, index) => {
                  return (
                    <View
                      className={`w-2 h-2 rounded full`}
                      index={index}
                      style={{ backgroundColor: dot.color }}
                    ></View>
                  );
                })}
              </View>
            </Pressable>
          );}}/>
      <View className="flex flex-row items-center justify-between mt-5">
        <View className="flex flex-row justify-center items-center gap-1">
          <View className="h-3 w-3 bg-markers-cleanser rounded-full"></View>
          <Text className="flex items-center gap-2 text-base">Cleanser</Text>
        </View>

        <View className="flex flex-row justify-center items-center gap-1">
          <View className="h-3 w-3 bg-markers-moisturizer rounded-full"></View>
          <Text className="flex items-center gap-2 text-base">Moisturizer</Text>
        </View>

        <View className="flex flex-row justify-center items-center gap-1">
          <View className="h-3 w-3 bg-markers-exfoliate rounded-full"></View>
          <Text className="flex items-center gap-2 text-base">Exfoliate</Text>
        </View>

        <View className="flex flex-row justify-center items-center gap-1">
          <View className="h-3 w-3 bg-markers-serum rounded-full"></View>
          <Text className="flex items-center gap-2 text-base">Serum</Text>
        </View>
      </View>

      <UserProductContainer></UserProductContainer>

      <StreaksComponent></StreaksComponent>
    </ScrollView>
  );
}
