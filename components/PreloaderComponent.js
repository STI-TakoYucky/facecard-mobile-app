import { View, Text, Animated, ActivityIndicator, Image, Easing  } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { togglePreloader } from '../state/PreloaderSlice/PreloaderSlice';

export default function PreloaderComponent() {
    const dispatch = useDispatch();
    const preloaderData = useSelector((state) => state.preloader)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnimFirstBottle = useRef(new Animated.Value(0)).current
    const scaleAnimSecondBottle = useRef(new Animated.Value(0)).current

    useEffect(() => {
        fadeIn();
        scaleIn_secondBottle();
        scaleIn_firstBottle();
    }, [])

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,  // 0.5 seconds fade-in
            useNativeDriver: true,
        }).start(() => {
            //delay
                setTimeout(() => {
                    fadeOut();
                }, 5000);    
        });
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,  // 0.5 seconds fade-out
            useNativeDriver: true,
        }).start(() => {
            // After fadeOut completes, dispatch togglePreloader
            dispatch(togglePreloader());
        });
    };

    const scaleIn_firstBottle = () => {
    Animated.timing(scaleAnimFirstBottle, {
        toValue: 1,
        duration: 2200,  // 0.5 seconds fade-out
        useNativeDriver: true,
        delay: 250,
         easing: Easing.bounce,
    }).start();
    }

     const scaleIn_secondBottle = () => {
    Animated.timing(scaleAnimSecondBottle, {
        toValue: 1,
        duration: 2200,  // 0.5 seconds fade-out
        useNativeDriver: true,
        delay: 450,
         easing: Easing.bounce,
    }).start();
    }

  return (
    <Animated.View style={{
        opacity: fadeAnim,
    }} className="absolute bg-white top-0 left-0 right-0 bottom-0 justify-center items-center z-50">
        <ActivityIndicator size="large" color="#dddddd" />
        <Text className="text-dark-800 text-xl text-center px-5 mt-5">{preloaderData?.message}</Text>

        <View className="absolute">
            <Animated.Image source={require('../assets/3d-skincare-bottle-free-png.png')}
            className="absolute bottom-[-27rem] left-[-19rem]"
            style={{
                width: 200,
                height: 200,
                transform: [{ scale: scaleAnimFirstBottle }],
            }}
            ></Animated.Image>

            <Animated.Image source={require('../assets/vecteezy_3d-skincare-bottle_19470925.png')}
            className="absolute top-[-27rem] right-[-18rem]"
            style={{
                width: 170,
                height: 170,
                transform: [{ scale: scaleAnimSecondBottle }],
            }}
            ></Animated.Image>

            <View className="absolute bg-accent left-[2rem] bottom-[-32rem] w-[-9rem] h-[19rem] rounded-full"></View>
        </View>
    </Animated.View>
  )
}