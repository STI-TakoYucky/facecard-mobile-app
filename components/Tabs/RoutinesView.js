import { View, Text, ScrollView, Platform, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState }  from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import AddSchedule from '../Screens/AddSchedule.js'

export default function RoutinesView() {

  const [isAddSchedule, setAddSchedule] = useState(false);

  const dispatch = useDispatch();
  // Get the routineScheds from the global state
  const routineData = useSelector((state) => state.routineSchedules);

  return (
    <ScrollView className="p-5" showsVerticalScrollIndicator={false}>

      <AddSchedule
        isAddSchedule={isAddSchedule}
        setAddSchedule={setAddSchedule}
      ></AddSchedule>

      <View className="mb-[8rem]">
      <Text className="text-dark-800 font-bold text-3xl">Setup your routines with ease!</Text>

      <View className="gap-8 mt-7">
        {routineData.map((routine, index) => {
          return (
            <View className="flex flex-col justify-center gap-2" key={index}>
              <Text className="text-dark-800 font-bold text-xl mb-2">{routine.name}</Text>

              {routine.schedules.map((schedule, index) => {
                return (
                  <View style={{backgroundColor: 'white',elevation: 5}} className="rounded-lg py-5 px-4 flex flex-row justify-between items-center" key={index}>
                    <Text className="text-dark-800 text-base font-bold">{schedule.time}</Text>
                    <Text className="text-dark-800  text-base">{schedule.dayOfWeek}</Text>
                    <TouchableOpacity onPress={() => {alert("edit")}}>
                      <Feather name="edit" size={20} color="#2D3B75" />
                    </TouchableOpacity>
                  </View>
                )
              })}

              <TouchableOpacity onPress={() => setAddSchedule(true)}>
                <View className="bg-gray-200 rounded-lg py-5 px-4 flex flex-row justify-between items-center">
                  <Text className="text-gray-500 text-base">Add Marker</Text>
                  <AntDesign name="plus" size={24} color="#6b7280" />
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
      </View>
    </ScrollView>
  )
}

{/* <TouchableOpacity>
                  <AntDesign name="pluscircle" size={40} color={"#2D3B75"} />
                </TouchableOpacity> */}

              //   <View className="flex items-center justify-center gap-2 mt-7">
              //   <View>
              //     <Text className="text-dark-800 text-lg font-bold">{routineData[currentIndex].name}</Text>
              //   </View>
              //   <Carousel
              //     width={width * 0.9}
              //     height={350}
              //     data={routineData}
              //     onSnapToItem={index => setCurrentIndex(index)}
              //     renderItem={({ index }) => (
              //       <View className="flex-1 m-4 rounded-2xl items-center justify-center"style={{backgroundColor: 'white',elevation: 5}}>
              //         <View>
              //           <View>
              //             <Text></Text>
              //           </View>
              //         </View>
              //       </View>
              //     )}
              //   />
        
              //   <View className='flex flex-row gap-1'>
              //     {
              //       routineData.map((dot, index) => {
              //         return (
              //           <View className={`${index === currentIndex ? 'bg-primary-200' : 'bg-primary-100'} w-2 h-2 rounded-full`}></View>
              //         )
              //       })
              //     }
              //   </View>
              // </View>



              // <Text className="text-dark-800 font-bold text-xl mb-2">{routine.name}</Text>
              // <TouchableOpacity>
              //   <View className="bg-gray-200 rounded-lg py-5 px-4 flex flex-row justify-between items-center">
              //     <Text className="text-gray-500 text-base">Add Marker</Text>
              //     <AntDesign name="plus" size={24} color="#6b7280" />
              //   </View>
              // </TouchableOpacity>