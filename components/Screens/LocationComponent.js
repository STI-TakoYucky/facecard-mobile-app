import { View, Text, ScrollView, Image, Pressable, Alert, Platform } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function LocationComponent() {
  const [location, setLocation] = useState();
  const [initialLocation, setInitialLocation] = useState(null);
  const [hasLeftLocation, setHasLeftLocation] = useState(false);
  const [calibrateBtnFocused, setCalibrateBtnFocused] = useState(false);
  const locationSubscriptionRef = useRef(null);

  useEffect(() => {
    // Set notification handler for when app is foregrounded
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Set Android notification channel
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }, []);

  // const sendNotification = async () => {
  //   if (!Device.isDevice) {
  //     Alert.alert('Error', 'Must use a physical device for notifications');
  //     return;
  //   }

  //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;

  //   if (existingStatus !== 'granted') {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }

  //   if (finalStatus !== 'granted') {
  //     Alert.alert('Permission Denied', 'Please enable notifications in settings');
  //     return;
  //   }

  //   // Schedule local notification
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'Hello from Expo 👋',
  //       body: 'This is a local notification on Android.',
  //       sound: true,
  //     },
  //     trigger: { seconds: 3 }, // show after 3 seconds
  //   });

  // };

    const sendNotification = async () => {

      if(!Device.isDevice) {
        Alert.alert("Error", 'Must use a physical device for notifications.')
        return;
      }

      const {status: existingStatus} = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if(existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if(finalStatus != "granted") {
        Alert.alert("Permission Denied", "Please enable notifications in the settings.");
        return;
      }

      // Send a test notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Test Notification',
          body: 'This is a test notification.',
        },
        trigger: { seconds: 1 }, // Trigger after 1 second
      });
    };


  const LOCATION_RADIUS_METERS = 20; // Distance threshold in meters

  // Haversine formula to calculate distance between two lat/lng points
  const getDistanceInMeters = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371000; // Earth radius in meters
    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);
    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Function to fetch the current location of the user
  async function fetchCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
      return null;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
    return currentLocation.coords;
  }

  // Function to calibrate location (set initial location)
  async function calibrateLocation() {
    const coords = await fetchCurrentLocation();
    if (coords) {
      setInitialLocation(coords); // Store the initial location as calibrated location
  
      // Remove previous subscription if it exists
      if (locationSubscriptionRef.current) {
        const sub = await locationSubscriptionRef.current;
        sub.remove();
        locationSubscriptionRef.current = null;
      }
  
      // Show a local notification after calibrating the location
      if (Device.isDevice) {
        const { status:existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const {status} = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        
        if(finalStatus !== "granted") {
          Alert.alert("Permission Denied", "Please enable notifications in the settings.")
          return;
        }

        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Location Calibrated 📍',
            body: 'We will alert you if you leave this area.',
            sound: true
          },
          trigger: null, // Send immediately
        });
      }
  
      // Start tracking location
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // 5 seconds
          distanceInterval: 1, // 1 meter
        },
        (newLocation) => {
          const distance = getDistanceInMeters(coords, newLocation.coords);
          const hasLeft = distance > LOCATION_RADIUS_METERS;

          if (hasLeft && !hasLeftLocation) {
            Alert.alert('Notice', 'You have left your calibrated location!');
          }

          setHasLeftLocation(hasLeft); // Update whether the user has left the calibrated location
        }
      );
  
      locationSubscriptionRef.current = Promise.resolve(subscription);
    }
  }

  useEffect(() => {
    return () => {
      if (locationSubscriptionRef.current) {
        locationSubscriptionRef.current.then(sub => sub.remove());
      }
    };
  }, []);

  return (
    <ScrollView className="p-5">
      <View className="flex gap-5">
        <Text className="text-3xl font-bold text-dark-800">Apply your sunscreen!</Text>
        <Text className="text-dark-800 text-base">
          Be reminded to apply sunscreen whenever you leave your home!
        </Text>
        <Image
          source={require('../../assets/assets_mapimage.png')}
          className="rounded-lg w-full h-[23rem] object-fill"
        />
        <Pressable
          onPress={calibrateLocation}
          style={{ elevation: 4 }}
          onPressIn={() => setCalibrateBtnFocused(true)}
          onPressOut={() => setCalibrateBtnFocused(false)}
          className={`bg-dark-800 ${calibrateBtnFocused && ' bg-primary-100'} transition-all rounded-full p-3`}
        >
          <Text className="text-white text-center text-base">
            Calibrate Location
          </Text>
        </Pressable>

        {hasLeftLocation && (
          <Text className="text-red-500 font-bold text-center">
            You have left your calibrated location!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
