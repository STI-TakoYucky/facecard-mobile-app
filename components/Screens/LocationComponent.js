import { View, Text, ScrollView, Image, Pressable, Alert, Platform } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from '../../state/userDataSlice/userDataSlice';
import { fonts } from '../../utils/fonts';

export default function LocationComponent() {
  const [initialLocation, setInitialLocation] = useState(null);
  const [calibrateBtnFocused, setCalibrateBtnFocused] = useState(false);
  const [hasSentNotification, setHasSentNotification] = useState(false);
  const locationSubscriptionRef = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

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
          title: 'Sunscreen Alert',
          body: 'Going outside? Make sure to apply sunscreen!',
        },
        trigger: { seconds: 1 }, // Trigger after 1 second
      });
    };

  const LOCATION_RADIUS_METERS = 2;

  const getDistanceInMeters = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371000;
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

  async function fetchCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
      return null;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    return currentLocation.coords;
  }

  async function calibrateLocation() {
    const coords = await fetchCurrentLocation();
    if (coords) {
      setInitialLocation(coords);

      if (locationSubscriptionRef.current) {
        const sub = await locationSubscriptionRef.current;
        sub.remove();
        locationSubscriptionRef.current = null;
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          Alert.alert('Permission Denied', 'Please enable notifications in the settings.');
          return;
        }

        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Location Calibrated 📍',
            body: 'We will alert you if you leave this area.',
            sound: true
          },
          trigger: null,
        });

        dispatch(setUserLocation({ location: coords, schedule: null }));
      }
    }
  }

  useEffect(() => {
    // Setup notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Setup Android notification channel
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }, []);

  useEffect(() => {
    try {
      if (userData?.location?.coordinates) {
      setInitialLocation(userData.location.coordinates);
    }
    } catch (error) {
      
    }

  }, [userData.location?.coordinates]);

  useEffect(() => {
    if (!initialLocation) return;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      if (locationSubscriptionRef.current) {
        const sub = await locationSubscriptionRef.current;
        sub.remove();
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 1,
        },
        (newLocation) => {
          const distance = getDistanceInMeters(initialLocation, newLocation.coords);
          const hasLeft = distance > LOCATION_RADIUS_METERS;

         if (hasLeft && !hasSentNotification) {
            sendNotification();
            setHasSentNotification(true); // ✅ Only send once per exit
          } else if (!hasLeft) {
            setHasSentNotification(false); // ✅ Reset when they return
          }

        }
      );

      locationSubscriptionRef.current = Promise.resolve(subscription);
    };

    startTracking();

    return () => {
      if (locationSubscriptionRef.current) {
        locationSubscriptionRef.current.then(sub => sub.remove());
      }
    };
  }, [initialLocation]);

  return (
    <ScrollView className="p-5">
      <View className="flex gap-5">
        <Text className="text-3xl text-dark-800 mt-5" style={[fonts.HeaderFont]}>Apply your sunscreen!</Text>
        <Text className="text-dark-800 text-base" style={[fonts.BodyFont]}>
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
          <Text className="text-white text-center text-base" style={[fonts.BodyFont]}>
            Calibrate Location
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
