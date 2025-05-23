import { SafeAreaView, View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { useState } from 'react';
import LoginComponent from "../LoginComponent"
import RegisterComponent from '../RegisterComponent';
import { fonts } from '../../utils/fonts';

export default function AuthenticationForm({setLoggedIn}) {
  const [isRegister, setIsRegister] = useState(false);
    //set registration second phase
    const [isSecondPhase, setSecondPhase] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView className="flex-1 items-center justify-center px-6 bg-slate-100 relative">
      <View className="w-full max-w-md relative">
        <Text className="text-3xl text-center mb-6 text-dark-800 " style={[fonts.openSansBold]}>
          {!isSecondPhase ? "Welcome to Facecard!" : "You are almost there!"}
        </Text>

        {isRegister ? <RegisterComponent isSecondPhase={isSecondPhase} setSecondPhase={setSecondPhase} setIsRegister={setIsRegister}/> : <LoginComponent setLoggedIn={setLoggedIn}/>}

        <TouchableOpacity
          onPress={() => setIsRegister(!isRegister)}
          className="mt-4"
        >
          { !isSecondPhase && <Text className="text-center text-dark-800" style={[fonts.NunitoSansVariable]}>
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

        <Image source={require('../../assets/skincare-cream.png')}
        className="absolute bottom-[-17rem] left-[-2.8rem]"
        style={{
            width: 140,
            height: 140,
        }}
        ></Image>

        <Image source={require('../../assets/vecteezy_3d-skincare-bottle_18778927.png')}
        className="absolute top-[-17rem] right-[-2.8rem]"
        style={{
            width: 140,
            height: 140,
        }}
        ></Image>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
