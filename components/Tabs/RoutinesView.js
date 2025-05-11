import { View, Text, ScrollView, Platform, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState }  from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import AddSchedule from '../Screens/AddSchedule.js'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import EditSchedule from '../Screens/EditSchedule.js'

export default function RoutinesView() {

  const [isAddSchedule, setAddSchedule] = useState(false);
  const [isEditSchedule, setEditSchedule] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState();

  const dispatch = useDispatch();
  // Get the routineScheds from the global state
  const routineData = useSelector((state) => state.routineSchedules);

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

      <AddSchedule
        isAddSchedule={isAddSchedule}
        setAddSchedule={setAddSchedule}
        selectedMarker={selectedMarker}
      ></AddSchedule>

      <EditSchedule
        isEditSchedule={isEditSchedule}
        setEditSchedule={setEditSchedule}
        selectedMarker={selectedMarker}
      ></EditSchedule>

      <View className="mb-[8rem]">
      <Text className="text-dark-800 font-bold text-3xl">Setup your routines with ease!</Text>

      <View className="gap-8 mt-7">
        {routineData.map((routine, index) => {

          let dailyFlag = false;

          return (
            <View className="flex flex-col justify-center gap-2" key={index}>
              <Text className="text-dark-800 font-bold text-xl mb-2">{routine.name}</Text>

              {routine.schedules.map((schedule, index) => {
                if (schedule.dayOfWeek === "Daily") {
                  dailyFlag = true;  // ✅ update the flag if we detect "Daily"
                }

                return (
                  <View style={{backgroundColor: 'white',elevation: 5}} className="rounded-lg py-5 px-4 flex flex-row justify-between items-center" key={index}>
                    <Text className="text-dark-800 text-base"><FontAwesome5 name="calendar-day" size={18} color="#2D3B75" />  <Text>{getDay(schedule.dayOfWeek)}</Text></Text>
                    <Text className="text-dark-800 text-base font-bold">
                      {schedule.time.length > 0 ? 
                      <View className="flex flex-row gap-2">
                        <MaterialCommunityIcons name="bell-ring" size={20} color="#2D3B75" /> 
                        <Text className="text-dark-800">Notifications On</Text>
                      </View> :
                      <View className="flex flex-row gap-2">
                        <MaterialCommunityIcons name="bell-off" size={20} color="#2D3B75" /> 
                        <Text className="text-dark-800">Notifications Off</Text>
                      </View> 
                      }</Text>
                    <TouchableOpacity onPress={() => {setEditSchedule(true); setSelectedMarker(routine.name)}}>
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