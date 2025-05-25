import { Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { signIn } from '../firebase/db';
import { useDispatch, useSelector } from 'react-redux';
import { storeUser } from '../state/userDataSlice/userDataSlice';
import { initDates } from '../state/markedDatesSlice/markedDatesSlice';
import { useEffect, useState } from 'react';
import { togglePreloader } from '../state/PreloaderSlice/PreloaderSlice';
import { fonts } from '../utils/fonts';

export default function LoginComponent({ setLoggedIn }) {

  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const result = await signIn(email, password);
    let errorMessage = "Login failed";

    if (!result.success) {
      switch (result.code) {
        case "auth/invalid-email":
          errorMessage = "Email format is incorrect.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password.";
          break;
        default:
          errorMessage = "Something went wrong. Please try again.";
      }
      Toast.show({
        type: 'error',
        text1: 'Login failed.',
        text2: errorMessage,     
      });
      } else {  
        Keyboard.dismiss()

        const docRef = doc(db, "users", result.userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(togglePreloader({message: "Login Successful!"}))
          dispatch(storeUser(docSnap.data()))
        } else {
          console.log("No such document!");
          return
        }
        setLoggedIn(true);
      }
    }

  return (
    <View className="flex">
      {/* Email */}
      <View className="relative mb-8">
        <Controller
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                className="px-3 py-4 text-base border rounded-lg border-dark-800 text-dark-800"
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
        {errors.email && <Text className="text-red-400 absolute bottom-[2.93rem] px-2 bg-slate-100 left-4" style={[fonts.BodyFont]}>{errors.email.message}</Text>}
      </View>

      {/* Password */}
      <View className="relative mb-8">
        <Controller
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                className="px-3 py-4 text-base border rounded-lg border-dark-800 text-dark-800"
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                style={[fonts.BodyFont]}
            />
            )}
            name="password"
        />
        {errors.password && <Text className="text-red-400 absolute bottom-[2.93rem] px-2 bg-slate-100 left-4" style={[fonts.BodyFont]}>{errors.password.message}</Text>}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="py-3 mt-2 rounded-lg bg-dark-800"
      >
        <Text className="text-center text-white font-bold" style={[fonts.BodyFont]}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
