import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import StreaksComponent from "../StreaksComponent";
import UserProductContainer from "../UserProductContainer";
import SkincareChecklist from "../Screens/SkincareChecklist";
import EditChecklist from "../Screens/EditChecklist";
import { useSelector } from "react-redux";

export default function Home() {


  const markedDates = useSelector((state) => state.markedDates);
  const routineSchedules = useSelector((state) => state.routineSchedules) || []
  const [isChecklistActive, setChecklistActive] = useState(false);
  const [isEditChecklistActive, setEditChecklist] = useState(false);
  const [selectedDate, setSelectedDate] = useState();


  useEffect(() => {
    alert(JSON.stringify(routineSchedules), null, 2)
  })

    

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
    <ScrollView className={`p-5 text-dark-900`} showsVerticalScrollIndicator={false}>
      <View className="pb-[8rem]">
      <SkincareChecklist 
      setChecklistActive={setChecklistActive} 
      isChecklistActive={isChecklistActive} 
      selectedDate={selectedDate}
      ></SkincareChecklist>

      <EditChecklist 
      setEditChecklist={setEditChecklist} 
      isEditChecklistActive={isEditChecklistActive}
      selectedDate={selectedDate}
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

                { routineSchedules.map((routine, index) => {
                  const startDate = routine.startDate;
                  const currentDate = date?.dateString.split("T")[0];
                  const isStartDateBefore = new Date(startDate) <= new Date(currentDate);

                  if(routine.dayOfWeek == day && isStartDateBefore) {
                    return (<View
                      className={`w-2 h-2 rounded-full ${getScheduleColor(routine.name)}`}
                      key={index}
                    ></View>)
                  } else if (routine.dayOfWeek == "daily" && isStartDateBefore) {
                    return (<View
                      return className={`w-2 h-2 rounded-full ${getScheduleColor(routine.name)}`}
                      key={index}
                    ></View>)
                  }
                }) }

              </View>
            </Pressable>
          );}}/>


      <View className="flex flex-row items-center justify-between mt-5">
      {
          routineSchedules.map((routine, index) => {
              return (
                <View className="flex flex-row justify-center items-center gap-1" key={index}>
                  <View className={`h-3 w-3 rounded-full ${getScheduleColor(routine.name)}`}></View>
                  <Text className="flex items-center gap-2 text-base">{routine.name}</Text>
                </View>
              )
            })
          }
      </View>

      <UserProductContainer></UserProductContainer>
      <StreaksComponent></StreaksComponent>
      </View>
    </ScrollView>
  );
}
