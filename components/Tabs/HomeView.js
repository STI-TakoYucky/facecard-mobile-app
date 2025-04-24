import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import StreaksComponent from "../StreaksComponent";
import UserProductContainer from "../UserProductContainer";
import SkincareChecklist from "../Screens/SkincareChecklist";
import EditChecklist from "../Screens/EditChecklist";

export default function Home() {

  
  const [isChecklistActive, setChecklistActive] = useState(false);
  const [isEditChecklistActive, setEditChecklist] = useState(false);
  const [selectedDate, setSelectedDate] = useState();


  const routines = [
    {
      name: "Cleanser",
      frequency: "daily",
      dayOfWeek: null,
      startDate: "2025-04-24"
    },
    {
      name: "Moisturizer",
      frequency: "weekly",
      dayOfWeek: 1,
      startDate: "2025-04-24"
    },
    {
      name: "Exfoliate",
      frequency: "weekly",
      dayOfWeek: 3,
      startDate: "2025-04-24"
    },
    {
      name: "Serum",
      frequency: "weekly",
      dayOfWeek: 5,
      startDate: "2025-04-24"
    }
  ];
  

  const [markedDates, setMarkedDates] = useState({});

  const HandleDayClick = (date, isMarked ) => {
    if (isMarked) {
      setSelectedDate(date);
      setEditChecklist(true)
      return
    }

    setSelectedDate(date);
    setChecklistActive(true);
  };

  const getScheduleColor = (schedule) => {
    switch (schedule) {
      case "Cleanser":
        return `bg-markers-cleanser`
      case "Moisturizer":
        return `bg-markers-moisturizer`
      case "Exfoliate":
        return `bg-markers-exfoliate`
      case "Serum":
        return `bg-markers-serum`
      default:
        break;
    }
  }

  return (
    <ScrollView className={`p-5 text-dark-900`}>

      <SkincareChecklist 
      setChecklistActive={setChecklistActive} 
      isChecklistActive={isChecklistActive} 
      setMarkedDates={setMarkedDates}
      selectedDate={selectedDate}
      markedDates={markedDates}
      ></SkincareChecklist>

      <EditChecklist 
      setEditChecklist={setEditChecklist} 
      isEditChecklistActive={isEditChecklistActive}
      setMarkedDates={setMarkedDates}
      selectedDate={selectedDate}
      markedDates={markedDates}
      ></EditChecklist>

      <Calendar
        markingType={"custom"}
        markedDates={markedDates}
        hideExtraDays={true}
        enableSwipeMonths={true}
        dayComponent={({ date, state }) => {
          const isMarked = !!markedDates[date?.dateString]
          const jsDate = new Date(date.dateString);
          const day = jsDate.getDay();;

          return (
            <Pressable
            key={date}
              onPress={() => {HandleDayClick(date?.dateString, isMarked)}}
              disabled={state === "disabled" ? true : false}>
              <View
                className={`h-[3rem] w-[3rem] flex items-center justify-center ${
                  isMarked ? "bg-dark-800" : ""
                } ${
                  state === "disabled" ? "" : "border-dark-800 border-[3px]"
                } rounded-full`}>
                <Text
                  className={`
                  text-base
                  font-bold
                  ${state === "disabled" ? "text-gray-300" : "text-dark-800"}
                  ${isMarked && "text-white"}`}>
                  {date?.day}
                </Text>
              </View>
              <View className="flex items-center justify-center min-h-2 mt-2 flex-row gap-1">

                { routines.map((routine, index) => {
                  const startDate = routine.startDate;
                  const currentDate = date?.dateString.split("T")[0];
                  const isStartDateBefore = new Date(startDate) <= new Date(currentDate);

                  if(routine.dayOfWeek == day && isStartDateBefore) {
                    return (<View
                      className={`w-2 h-2 rounded-full ${getScheduleColor(routine.name)}`}
                      index={index}
                    ></View>)
                  } else if (routine.frequency == "daily" && isStartDateBefore) {
                    return (<View
                      return className={`w-2 h-2 rounded-full ${getScheduleColor(routine.name)}`}
                      index={index}
                    ></View>)
                  }
                }) }

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
