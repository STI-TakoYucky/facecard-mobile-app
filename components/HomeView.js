import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars';

export default function Home() {
  return (
    <ScrollView className="p-5 h-full">
        <Calendar
          onDayPress={() => {
            alert("HEllo")
          }}
        />
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-cleanser rounded-full"></View>Cleanser</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-moisturizer rounded-full"></View>Moisturizer</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-exfoliate rounded-full"></View>Exfoliate</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-serum rounded-full"></View>Serum</Text>
        </View>

        <Calendar
          onDayPress={() => {
            alert("HEllo")
          }}
        />
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-cleanser rounded-full"></View>Cleanser</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-moisturizer rounded-full"></View>Moisturizer</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-exfoliate rounded-full"></View>Exfoliate</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-serum rounded-full"></View>Serum</Text>
        </View>

        <Calendar
          onDayPress={() => {
            alert("HEllo")
          }}
        />
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-cleanser rounded-full"></View>Cleanser</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-moisturizer rounded-full"></View>Moisturizer</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-exfoliate rounded-full"></View>Exfoliate</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-serum rounded-full"></View>Serum</Text>
        </View>

        <Calendar
          onDayPress={() => {
            alert("HEllo")
          }}
        />
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-cleanser rounded-full"></View>Cleanser</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-moisturizer rounded-full"></View>Moisturizer</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-exfoliate rounded-full"></View>Exfoliate</Text>
          <Text className="flex items-center gap-2 text-base"><View className="h-3 w-3 bg-markers-serum rounded-full"></View>Serum</Text>
        </View>
      </ScrollView>
  )
}