import { View, Text, Modal, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { fonts } from '../../utils/fonts';
import { useDispatch } from 'react-redux';
import { setUserPremiumAcc } from '../../state/userDataSlice/userDataSlice';
import { togglePreloader } from '../../state/PreloaderSlice/PreloaderSlice';

export default function CancelSubscription({ setEditProfile, isCancelSubscription, setCancelSubscription }) {
    const dispatch = useDispatch();
    
    const handleConfirm = () => {
        dispatch(setUserPremiumAcc(false))
        setEditProfile(false)
        dispatch(togglePreloader({message: "We are processing your account..."}))
    }

  return (
    <Modal 
    visible={isCancelSubscription}
    animationType="slide"
    onRequestClose={() => setCancelSubscription(false)}
    >
   
        <View className="bg-primary-100 px-5 py-4 max-h-[50px] flex-row justify-start items-center">
            <TouchableOpacity onPress={() => setCancelSubscription(false)}>
                <Ionicons name="arrow-back-sharp" size={22} color="#2D3B75" />
            </TouchableOpacity>
        </View>
        <View className="p-5 flex justify-between flex-1">
            <View>
            <Image source={require("../../assets/CancelSubscriptionImage.png")}
                style={{width: 250, height:350, alignSelf: 'center'}}/>
                <View className="flex flex-col gap-5">
                    <Text className="text-2xl text-center text-dark-800" style={[fonts.HeaderFont]}>
                    We're sorry to see you go!
                    </Text>
                    <Text className="text-base text-center text-dark-800" style={[fonts.BodyFont]}> 
                        Are you sure you want to cancel your subscription?
                    </Text>
                </View>
            </View>
            <View className="flex flex-col items-center justify-center mb-5">
                <View className="w-full">
                    <TouchableOpacity onPress={() => handleConfirm()}>
                        <Text className="text-white bg-dark-800 w-full py-3 rounded-full text-center text-base" style={[fonts.BodyFont]}>
                            Cancel Subscription
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}