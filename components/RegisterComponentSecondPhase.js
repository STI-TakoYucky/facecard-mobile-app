import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React, { useEffect } from 'react'
import { Controller } from "react-hook-form";
import { useState } from "react";
import {DateTimePickerModal} from 'react-native-modal-datetime-picker'
import { useDispatch } from "react-redux";
import { togglePreloader } from "../state/PreloaderSlice/PreloaderSlice";

export default function RegisterComponentSecondPhase({control, errors, handleSubmit, onSubmit, setSecondPhase}) {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  return (
    <View className="relative">
    {/* firstName*/}
    <View className="mb-8 relative">
      <Controller
        control={control}
        rules={{ required: "First Name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
            placeholder="First Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && (
        <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">
          {errors.firstName.message}
        </Text>
      )}
    </View>

    {/* last name*/}
    <View className="mb-8 relative">
      <Controller
        control={control}
        rules={{ required: "Last Name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
            placeholder="Last Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && (
        <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">
          {errors.lastName.message}
        </Text>
      )}
    </View>

    <View className="mb-8 relative">
      <Controller
        control={control}
        rules={{ required: "Birthday is required" }}
        render={({ field: { onChange, value } }) => (
          <>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <TextInput
            className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
            placeholder="Birthdate"
            editable={false}
            value={value}
            pointerEvents="none" // prevents the keyboard from opening
          />
        </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
                const year = date.getFullYear();
                const formattedDate = `${month}/${day}/${year}`;
                onChange(formattedDate);
                setDatePickerVisibility(false)
            }}
            onCancel={() => setDatePickerVisibility(false)}
          />
          </>
        )}
        name="birthdate"
        >
      </Controller>

      {errors.birthdate && (
        <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">
          {errors.birthdate.message}
        </Text>
      )}
    </View>
    
    <View className="flex flex-row items-center justify-center gap-2">
      <TouchableOpacity style={{paddingBlock: 9}} onPress={() => setSecondPhase(false)} className="flex-1 border border-dark-800 rounded-lg mt-2">
        <Text className="text-dark-800 text-center font-bold">Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="flex-1 bg-dark-800 py-3 rounded-lg mt-2">
        <Text className="text-white text-center font-bold">Confirm</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}