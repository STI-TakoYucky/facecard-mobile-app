import { View, Text, Animated, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { togglePreloader } from '../state/PreloaderSlice/PreloaderSlice';

export default function PreloaderComponent() {
    const dispatch = useDispatch();
    const preloaderData = useSelector((state) => state.preloader)
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeIn();
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

  return (
    <Animated.View style={{
        opacity: fadeAnim
    }} className="absolute bg-white top-0 left-0 right-0 bottom-0 justify-center items-center z-50">
        <ActivityIndicator size="large" color="#dddddd" />
        <Text className="text-dark-800 text-lg text-center px-5 mt-5">{preloaderData?.message}</Text>
    </Animated.View>
  )
}