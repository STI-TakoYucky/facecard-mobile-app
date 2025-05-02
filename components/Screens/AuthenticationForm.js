import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import LoginComponent from "../LoginComponent"
import RegisterComponent from '../RegisterComponent';

export default function AuthenticationForm({setLoggedIn}) {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-center mb-6 text-dark-800">
          Welcome to Facecard!
        </Text>

        {isRegister ? <RegisterComponent /> : <LoginComponent setLoggedIn={setLoggedIn}/>}

        <TouchableOpacity
          onPress={() => setIsRegister(!isRegister)}
          className="mt-4"
        >
          <Text className="text-center text-dark-800">
            {isRegister
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
