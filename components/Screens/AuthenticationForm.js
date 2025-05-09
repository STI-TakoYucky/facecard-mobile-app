import { SafeAreaView, View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import LoginComponent from "../LoginComponent"
import RegisterComponent from '../RegisterComponent';

export default function AuthenticationForm({setLoggedIn}) {
  const [isRegister, setIsRegister] = useState(false);
    //set registration second phase
    const [isSecondPhase, setSecondPhase] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-center mb-6 text-dark-800">
          {!isSecondPhase ? "Welcome to Facecard!" : "You are almost there!"}
        </Text>

        {isRegister ? <RegisterComponent isSecondPhase={isSecondPhase} setSecondPhase={setSecondPhase} setIsRegister={setIsRegister}/> : <LoginComponent setLoggedIn={setLoggedIn}/>}

        <TouchableOpacity
          onPress={() => setIsRegister(!isRegister)}
          className="mt-4"
        >
          { !isSecondPhase && <Text className="text-center text-dark-800">
            {isRegister
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Text>}
        </TouchableOpacity>

        {
          isRegister && !isSecondPhase &&  (
            <View className="mt-10 flex gap-3">
              <Text className="text-gray-500">Password must contain atleast one special character from !#$-_%@.</Text>
              <Text className="text-gray-500">Password must contain atleast a letter and a number.</Text>
              <Text className="text-gray-500">Password must not have spaces.</Text>
            </View>
          )
        }
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
