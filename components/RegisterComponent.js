import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import RegisterComponentSecondPhase from "./RegisterComponentSecondPhase";
import { useDispatch } from "react-redux";
import { togglePreloader } from "../state/PreloaderSlice/PreloaderSlice";
import { signUp } from "../firebase/db";
import Toast from "react-native-toast-message";
import { fonts } from "../utils/fonts";



export default function RegisterComponent({isSecondPhase, setSecondPhase, setIsRegister}) {

  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

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

  const onSubmit = async () => {
    const emailValue = getValues("email").trim();
    const passwordValue = getValues("password").trim()
    const firstName = getValues("firstName").trim()
    const lastName = getValues("lastName").trim()
    const confirmPasswordValue = getValues("confirmPassword").trim()
    const birthdate = getValues("birthdate").trim()

    if(isSecondPhase) {

          const { success } = await signUp(emailValue,passwordValue, firstName, lastName, birthdate)
          if (success) {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Registered Successfully!',
            });
            dispatch(togglePreloader({message: "Registered Successfully!"}))
            setSecondPhase(false)
            setIsRegister(false)
          } else {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Oh no!',
              text2: "Current email is already in use.",
            });
          }

    } else {
      dispatch(togglePreloader({message: "Before we register your account, we would like to ask you some additional questions."}))

      setTimeout(() => {
        setValue("email", null)
        setValue("password", null)
        setValue("confirmPassword", null)
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
              rules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address"
                } 
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[fonts.BodyFont]}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-red-400 absolute bottom-[2.93rem] px-2 bg-slate-100 left-4" style={[fonts.BodyFont]}>
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Password */}
          <View className="mb-8 relative">
            <Controller
              control={control}
              rules={{ 
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*[!#$%\-_@.])(?=.*\d)[A-Za-z\d!#$%\-_@.]{8,}$/,
                  message: "Invalid password"
                } 
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="border border-dark-800 text-dark-800 rounded-lg px-3 py-4 text-base"
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={isPasswordVisible}
                    style={[fonts.BodyFont]}
                    />
              )}
              name="password"
            />
              <TouchableOpacity onPress={() => {setPasswordVisible(prev => !prev)}}>
                  <AntDesign className="absolute right-0 bottom-[-.3rem] p-5 z-50" name="eyeo" size={24} color="#2D3B75" />
              </TouchableOpacity>
            {errors.password && (
              <Text className="text-red-400 absolute bottom-[2.93rem] px-2 bg-slate-100 left-4" style={[fonts.BodyFont]}>
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
                  secureTextEntry={isConfirmPasswordVisible}
                  style={[fonts.BodyFont]}
                />
              )}
              name="confirmPassword"
            />

              <TouchableOpacity onPress={() => {setConfirmPasswordVisible(prev => !prev)}}>
                  <AntDesign className="absolute right-0 bottom-[-.3rem] p-5 z-50" name="eyeo" size={24} color="#2D3B75" />
              </TouchableOpacity>
            {errors.confirmPassword && (
              <Text className="text-red-400 absolute bottom-[2.93rem] px-2 bg-slate-100 left-4" style={[fonts.BodyFont]}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-dark-800 py-3 rounded-lg mt-2"
          >
            <Text className="text-white text-center font-bold" style={[fonts.BodyFont]}>Register</Text>
          </TouchableOpacity>

        </>
      ) : (
       <RegisterComponentSecondPhase control={control} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} setSecondPhase={setSecondPhase}></RegisterComponentSecondPhase>
      )}
    </View>
  );
}
