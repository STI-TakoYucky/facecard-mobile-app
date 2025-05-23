import { View, Text, Modal, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { fonts } from '../../utils/fonts';
import { useDispatch } from 'react-redux';
import { setUserPremiumAcc } from '../../state/userDataSlice/userDataSlice';

export default function SubscriptionProcess({ isPremiumSubProcess, setPremiumSubProcess }) {

    const [monthlySub, setMonthlySub] = useState(true);
    const [yearlySub, setYearlySub] = useState(false);
    const dispatch = useDispatch();
    

    const handleConfirm = () => {
        dispatch(setUserPremiumAcc(true))
    }

  return (
    <Modal 
    visible={isPremiumSubProcess}
    animationType="slide"
    onRequestClose={() => setPremiumSubProcess(false)}
    >
        <View className="bg-primary-100 px-5 py-4 max-h-[50px] flex-row justify-start items-center">
            <TouchableOpacity onPress={() => setPremiumSubProcess(false)}>
                <Ionicons name="caret-back" size={20} color="#2D3B75" />
            </TouchableOpacity>
        </View>
        <View className="p-5">
            <Image source={require("../../assets/dermatologist-consultation.png")}
                style={{width: 250, height: 300, alignSelf: 'center'}}
            ></Image>
            <View className="flex flex-col items-center justify-center">
                <View className="flex flex-col gap-5">
                    <Text className="text-2xl text-center text-dark-800" style={[fonts.openSansBold]}>
                    Skincare Advice!
                    </Text>
                    <Text className="text-base text-center text-dark-800" style={[fonts.NunitoSansVariable]}> 
                        Chat with our partnered dermatologists for personal skincare advice!
                    </Text>
                </View>

                <View className="w-full mt-7 gap-4">
                    <Pressable onPress={() => {setYearlySub(false); setMonthlySub(true)}}>
                        <View className={`${monthlySub ? 'border-dark-800 border-[1.5px]' : 'bg-slate-100'} rounded-lg px-5 py-3 flex flex-col justify-between gap-2 w-full`}>
                            <View className="flex flex-row justify-between">
                                <Text className="font-bold text-lg text-dark-800">Monthly</Text>
                                <Text className="text-base text-dark-800 bg-markers-moisturizer rounded-full px-3 py-1">Best Seller</Text>
                            </View>
                            <Text className="text-dark-800 text-base">₱198.00/Month</Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={() => {setYearlySub(true); setMonthlySub(false)}}>
                        <View className={`${yearlySub ? 'border-dark-800 border-[1.5px]'  : 'bg-slate-100'} rounded-lg  px-5 py-3 flex flex-col justify-between gap-2 w-full`}>
                            <Text className="font-bold text-lg text-dark-800">Yearly</Text>
                            <Text className="text-dark-800 text-base">₱950.00/Year</Text>
                        </View>
                    </Pressable>
                </View>

                <View className="w-full mt-10">
                    <TouchableOpacity onPress={() => handleConfirm()}>
                        <Text className="text-white bg-dark-800 w-full py-3 rounded-full text-center text-lg">
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}