import { View, Text, Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../state/userDataSlice/userDataSlice";

export default function EditProfile({ isEditProfile, setEditProfile, userData }) {

      const {control, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({
        defaultValues: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthdate: userData.birthdate,
        },
    }); 

    useEffect(() => {
        if (userData) {
            setValue("firstName", userData.firstName || "");
            setValue("lastName", userData.lastName || "");
            setValue("birthdate", userData.birthdate || "");
        }
    }, []);
    
    const dispatch = useDispatch();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const onSubmit = () => {
        const firstName = getValues("firstName")
        const lastName = getValues("lastName")
        const birthdate = getValues("birthdate")
        dispatch(updateUserInfo({firstName: firstName, lastName: lastName, birthdate: birthdate}))
    }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isEditProfile}
      onRequestClose={() => setEditProfile(false)}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="w-[24rem] bg-white rounded-2xl py-6 px-[2rem] shadow-xl justify-between">
          <View className="flex gap-2">
            <Text className="text-2xl font-semibold mb-6 text-dark-800">
              Edit Profile
            </Text>

            {/* firstName*/}
            <View className="mb-4 relative">
              <Controller
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text className="text-dark-800 mb-4">First Name</Text>
                  <TextInput
                    className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                    placeholder="First Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </>
                )}
                name="firstName"
              />
              {errors.firstName && (
                <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">
                  {errors.firstName.message}
                </Text>
              )}
            </View>

             {/* lastName*/}
            <View className="mb-4 relative">
              <Controller
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                    <Text className="text-dark-800 mb-4">Last Name</Text>
                    <TextInput
                        className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                        placeholder="Last Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    </>

                )}
                name="lastName"
              />
              {errors.lastName && (
                <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">
                  {errors.lastName.message}
                </Text>
              )}
            </View>

              <View className="mb-4 relative">
                <Controller
                    control={control}
                    rules={{ required: "Birthday is required" }}
                    render={({ field: { onChange, value } }) => (
                    <>
                                        <Text className="text-dark-800 mb-4">Birthdate</Text>
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

             
          </View>

          <View className="flex flex-row gap-2 justify-end mt-[2rem]">
            <Pressable onPress={() => setEditProfile(false)}>
              <Text className="bg-white border border-dark-800 rounded-md px-4 py-[.49rem] shadow-sm">
                Cancel
              </Text>
            </Pressable>
            <Pressable onPress={handleSubmit(onSubmit)}>
              <Text className="bg-dark-800 text-white text-base py-2 px-4 rounded-md">
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
