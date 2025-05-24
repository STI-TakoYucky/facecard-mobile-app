import { View, Text, ScrollView, Pressable, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import StreaksComponent from "../StreaksComponent";
import UserProductContainer from "../UserProductContainer";
import SkincareChecklist from "../Screens/SkincareChecklist";
import EditChecklist from "../Screens/EditChecklist";
import { useDispatch, useSelector } from "react-redux";
import { initDates } from "../../state/markedDatesSlice/markedDatesSlice";
import { initRoutineSchedules } from "../../state/routineSchedulesSlice/routineSchedulesSlice";
import { fonts } from "../../utils/fonts";
import { setStreak } from "../../state/userDataSlice/userDataSlice";

export default function Home() {

  const dispatch = useDispatch()
  const userData = useSelector(state => state.userData) 
  const markedDates = useSelector((state) => state.markedDates);
  const routineSchedules = useSelector((state) => state.routineSchedules) || []
  const [isChecklistActive, setChecklistActive] = useState(false);
  const [isEditChecklistActive, setEditChecklist] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    //initialize dates from the database
    dispatch(initDates(userData.markedDates))
    dispatch(initRoutineSchedules(userData.routineSchedules))
  }, [])

  useEffect(() => {

    function getStreak() {
    let dates = Object.keys(markedDates);
    if (dates.length === 0) return 0;

    let sortedDate = dates.sort().reverse();
    let streak = 1; // At least one date exists

    for (let i = 0; i < sortedDate.length - 1; i++) {
      let date1 = new Date(sortedDate[i]);
      let date2 = new Date(sortedDate[i + 1]);

      const differenceInDays = (date1 - date2) / (1000 * 60 * 60 * 24);

      if (differenceInDays === 1) {
        streak++;
      } else {
        break; // Streak broken
      }
    }

    dispatch(setStreak(streak))
  }

  getStreak()

  }, [markedDates])


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
        theme={{
          textMonthFontSize: 16,
          monthTextColor: '#2D3B75',
          arrowColor: '#2D3B75',
        }}
        dayComponent={({ date, state }) => {
          const isMarked = !!markedDates[date?.dateString];
          const jsDate = new Date(date.dateString);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
          const isFutureDate = jsDate > today;

          const day = jsDate.getDay();

          // Disable if already disabled or if date is after today
          const isDisabled = state === "disabled" || isFutureDate;

          return (
            <TouchableOpacity
              key={date.dateString}
              onPress={() => HandleDayClick(date?.dateString, isMarked)}
              disabled={isDisabled}
            >
              <View
                className={`h-[3rem] w-[3rem] flex items-center justify-center ${
                  isMarked ? "bg-dark-800" : ""
                } ${!isDisabled ? "border-dark-800 border-[3px]" : "border-slate-300 border-[3px]"} rounded-full`}
              >
                <Text
                  className={`text-base font-bold ${
                    isDisabled ? "text-slate-300" : "text-dark-800"
                  } ${isMarked ? "text-white" : ""}`}
                >
                  {date?.day}
                </Text>
              </View>

              <View className="flex items-center justify-center min-h-2 mt-2 flex-row gap-1">
                {routineSchedules.map((routine, index) => {
                  const startDate = routine.startDate;
                  const currentDate = date?.dateString.split("T")[0];
                  const isStartDateBefore = new Date(startDate) <= new Date(currentDate);

                  return routine.schedules.map((sched, idx) => {
                    if (
                      (sched.dayOfWeek === day || sched.dayOfWeek === "Daily") &&
                      isStartDateBefore
                    ) {
                      return (
                        <View
                          className={`w-2 h-2 rounded-full ${getScheduleColor(routine.name)}`}
                          key={idx}
                        />
                      );
                    }
                    return null;
                  });
                })}
              </View>
            </TouchableOpacity>
          );
        }}
      />



      <View className="flex flex-row items-center justify-between mt-5">
      {
          routineSchedules.map((routine, index) => {
              return (
                <View className="flex flex-row justify-center items-center gap-1" key={index}>
                  <View className={`h-3 w-3 rounded-full ${getScheduleColor(routine.name)}`}></View>
                  <Text className="flex items-center gap-2 text-base text-dark-800" style={[fonts.NunitoSansVariable]}>{routine.name}</Text>
                </View>
              )
            })
          }
      </View>

      <StreaksComponent userDataStreak={userData.streak}></StreaksComponent>
      </View>
    </ScrollView>
  );
}
