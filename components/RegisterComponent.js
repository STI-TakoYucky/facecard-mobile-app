import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import RegisterComponentSecondPhase from "./RegisterComponentSecondPhase";
import { useDispatch } from "react-redux";
import { togglePreloader } from "../state/PreloaderSlice/PreloaderSlice";

export default function RegisterComponent({isSecondPhase, setSecondPhase}) {
  

  const dispatch = useDispatch();

  const {control, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      birthdate: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    if(isSecondPhase) {
      console.log(data);
      alert("Registered successfully!");
    } else {
      dispatch(togglePreloader({message: "Before we register your account, we would like to ask you some additional questions."}))
      const emailValue = getValues("email");
      const passwordValue = getValues("password")
      const confirmPasswordValue = getValues("confirmPassword")

      setTimeout(() => {
        setValue("email", "")
        setValue("password", "")
        setValue("confirmPassword", "")
        setSecondPhase(true)
      }, 500);



      setTimeout(() => {
        setValue("email", emailValue)
        setValue("password", passwordValue)
        setValue("confirmPassword", confirmPasswordValue)
      }, 1000);
    }
  };

  return (
    <View className="flex relative">
      {!isSecondPhase ? (
        <>
          {/* Email */}
          <View className="mb-8 relative">
            <Controller
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Password */}
          <View className="mb-8 relative">
            <Controller
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Confirm Password */}
          <View className="mb-8 relative">
            <Controller
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                  placeholder="Confirm Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 absolute bottom-[2.93rem] px-2 bg-white left-4">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => getUser()}
            className="bg-dark-800 py-3 rounded-lg mt-2"
          >
            <Text className="text-white text-center font-bold">Register</Text>
          </TouchableOpacity>
        </>
      ) : (
       <RegisterComponentSecondPhase control={control} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} setSecondPhase={setSecondPhase}></RegisterComponentSecondPhase>
      )}
    </View>
  );
}
