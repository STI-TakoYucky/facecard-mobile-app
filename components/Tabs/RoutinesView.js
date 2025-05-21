import { View, Text, ScrollView, Platform, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect }  from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import AddSchedule from '../Screens/AddSchedule.js'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import EditSchedule from '../Screens/EditSchedule.js'
import { updateUserSchedules } from '../../state/userDataSlice/userDataSlice.js';
import notifee, { TimestampTrigger, TriggerType, RepeatFrequency, AndroidImportance } from '@notifee/react-native';



export default function RoutinesView() {

  const [isAddSchedule, setAddSchedule] = useState(false);
  const [isEditSchedule, setEditSchedule] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState();
  const [scheduleID, setScheduleID] = useState();

  const dispatch = useDispatch();
  const routineData = useSelector((state) => state.routineSchedules);

  useEffect(() => {
    dispatch(updateUserSchedules(routineData));
  }, [routineData]);

  function parseTime12h(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}

async function scheduleNotifications(routineData) {
  await notifee.requestPermission();

  for (const routine of routineData) {
    for (const schedule of routine.schedules) {
      for (const timeStr of schedule.time) {
        const { hours, minutes } = parseTime12h(timeStr);
        const dayOfWeek = schedule.dayOfWeek;
        const now = new Date();

        let triggerDate = new Date(now);

        if (dayOfWeek !== 'Daily') {
          const today = now.getDay();
          const targetDay = Number(dayOfWeek);
          const diff = (targetDay + 7 - today) % 7;
          triggerDate.setDate(now.getDate() + diff);
        }

        triggerDate.setHours(hours);
        triggerDate.setMinutes(minutes);
        triggerDate.setSeconds(0);
        triggerDate.setMilliseconds(0);

        if (triggerDate <= now) {
          triggerDate.setDate(triggerDate.getDate() + 7);
        }

        const trigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: triggerDate.getTime(),
          repeatFrequency:
            dayOfWeek === 'Daily' ? RepeatFrequency.DAILY : RepeatFrequency.WEEKLY,
        };

        await notifee.createTriggerNotification(
          {
            title: `${routine.name} Reminder`,
            body:  `Time to do your ${routine.name}!` ,
            android: {
              channelId: 'default',
              importance: AndroidImportance.HIGH,
            },
          },
          trigger
        );
      }
    }
  }
}


  useEffect(() => {
    if (routineData.length > 0) {
      (async () => {
        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        });

        // Cancel all previous notifications before scheduling new ones
        await notifee.cancelAllNotifications();

        await scheduleNotifications(routineData);
      })();
    }
  }, [routineData]);

  const getDay = (day) => {
    switch (day) {
      case "Daily":
        return "Daily";
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "Invalid day"; // In case of an invalid input (like a number greater than 6)
    }
  };
  

  return (
    <ScrollView className="p-5" showsVerticalScrollIndicator={false}>

      {
        isAddSchedule &&
        <AddSchedule
        isAddSchedule={isAddSchedule}
        setAddSchedule={setAddSchedule}
        selectedMarker={selectedMarker}
      ></AddSchedule>}

      {
        isEditSchedule && 
        <EditSchedule
          isEditSchedule={isEditSchedule}
          setEditSchedule={setEditSchedule}
          selectedMarker={selectedMarker}
          scheduleID={scheduleID}
        ></EditSchedule>
      }

      <View className="mb-[8rem]">
      <Text className="text-dark-800 font-bold text-3xl">Setup your routines with ease!</Text>

      <View className="gap-8 mt-7">
        {routineData.map((routine, index) => {

          let dailyFlag = false;

          return (
            <View className="flex flex-col justify-center gap-2" key={index}>
              <Text className="text-dark-800 font-bold text-xl mb-2">{routine.name}</Text>

              {routine.schedules.map((schedule) => {

                if (schedule.dayOfWeek === "Daily") {
                  dailyFlag = true;  // ✅ update the flag if we detect "Daily"
                }

                return (
                  <View
                    style={{ backgroundColor: 'white', elevation: 5 }}
                    className="rounded-lg py-5 px-4 flex flex-row justify-between items-center"
                    key={schedule.id}
                  >
                    <View className="flex items-center flex-row gap-2">
                      <FontAwesome5 name="calendar-day" size={15} color="#2D3B75" /> 
                       <Text className="text-dark-800 text-base">
                        {getDay(schedule.dayOfWeek)}
                      </Text>
                    </View>

                    <View className="flex flex-row gap-2 items-center">
                      <MaterialCommunityIcons
                        name={schedule.time.length > 0 ? 'bell-ring' : 'bell-off'}
                        size={18}
                        color="#2D3B75"
                      />
                      <Text className="text-dark-800 text-base font-bold">
                        {schedule.time.length > 0 ? 'Notifications On' : 'Notifications Off'}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setEditSchedule(true);
                        setSelectedMarker(routine.name);
                        setScheduleID(schedule.id);
                      }}
                    >
                      <Feather name="edit" size={20} color="#2D3B75" />
                    </TouchableOpacity>
                  </View>

                )
              })}

              {routine.schedules.length < 4 && !dailyFlag &&
                (
                  <TouchableOpacity onPress={() => {setAddSchedule(true); setSelectedMarker(routine.name)}}>
                    <View className="bg-gray-200 rounded-lg py-5 px-4 flex flex-row justify-between items-center">
                      <Text className="text-gray-500 text-base">Add Marker</Text>
                      <AntDesign name="plus" size={24} color="#6b7280" />
                    </View>
                  </TouchableOpacity>
                )
              }
            </View>
          )
        })}
      </View>
      </View>
    </ScrollView>
  )
}