import { View, Text, Modal, Pressable, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../state/userDataSlice/userDataSlice";
import { fonts } from "../../utils/fonts";
import CancelSubscription from "./CancelSubscription";

export default function EditProfile({ isEditProfile, setEditProfile, userData }) {


    const [isCancelSubscription, setCancelSubscription] = useState(false)
    const isPremiumAcc = userData.isPremiumAcc

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
            <Text className="text-2xl font-semibold mb-6 text-dark-800" style={[fonts.HeaderFont]}>
              Edit Profile
            </Text>

            {/* firstName*/}
            <View className="mb-4 relative">
              <Controller
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text className="text-dark-800 mb-4" style={[fonts.BodyFont]}>First Name</Text>
                  <TextInput
                    className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                    placeholder="First Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[fonts.BodyFont]}
                  />
                </>
                )}
                name="firstName"
              />
              {errors.firstName && (
                <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4" style={[fonts.BodyFont]}>
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
                    <Text className="text-dark-800 mb-4" style={[fonts.BodyFont]}>Last Name</Text>
                    <TextInput
                        className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                        placeholder="Last Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[fonts.BodyFont]}
                    />
                    </>

                )}
                name="lastName"
              />
              {errors.lastName && (
                <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4" style={[fonts.BodyFont]}>
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
                    <Text className="text-dark-800 mb-4" style={[fonts.BodyFont]}>Birthdate</Text>
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                    <TextInput
                        className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                        placeholder="Birthdate"
                        editable={false}
                        value={value}
                        pointerEvents="none"
                        style={[fonts.BodyFont]}
                    />
                    </TouchableOpacity>
            
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={(date) => {
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
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
                    <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4" style={[fonts.BodyFont]}>
                    {errors.birthdate.message}
                    </Text>
                )}
                </View>

           { isPremiumAcc && 
              <View>

                <CancelSubscription setEditProfile={setEditProfile} isCancelSubscription={isCancelSubscription} setCancelSubscription={setCancelSubscription}></CancelSubscription>

                <Text className="text-2xl font-semibold mb-6 text-dark-800" style={[fonts.HeaderFont]}>
                  Subscription
                </Text>
                <TouchableOpacity onPress={() => setCancelSubscription(true)} style={[fonts.BodyFont, { alignSelf: "flex-start" }]}>
                  <View className="bg-dark-800 rounded-md px-4 py-2">
                    <Text className="text-white text-base" style={[fonts.BodyFont]}>
                      Cancel Subscription
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            }

          </View>

          <View className="flex flex-row gap-2 justify-end mt-[2rem]">
            <TouchableOpacity onPress={() => setEditProfile(false)} style={[fonts.BodyFont]}>
              <Text className="bg-white border border-dark-800 text-dark-800 rounded-md px-4 py-[.49rem]">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={[fonts.BodyFont]}>
              <Text className="bg-dark-800 text-white text-base py-2 px-4 rounded-md">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
