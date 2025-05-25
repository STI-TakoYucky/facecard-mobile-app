import { SafeAreaView, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Tabs/HomeView';
import "./global.css";
import BottomNavbar from './components/BottomNavbar';
import SkincareListView from './components/Tabs/SkincareListView';
import RoutinesView from './components/Tabs/RoutinesView';
import FaceDiaryView from './components/Tabs/FaceDiaryView';
import LocationComponent from './components/Screens/LocationComponent';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './state/store.js';
import AuthenticationForm from './components/Screens/AuthenticationForm.js';
import PreloaderComponent from './components/PreloaderComponent.js';
import Toast from 'react-native-toast-message';
import { toastConfig } from './components/ToastConfig.js';
import DrawerComponent from './components/DrawerComponent.js';
import Profile from './components/Screens/Profile.js';
import { saveUserData } from './state/userDataSlice/userDataSlice.js';
import * as Font from 'expo-font';
import Inbox from './components/Screens/Inbox.js';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'BodyFont': require('./assets/fonts/OpenSans-Regular.ttf'),
      'HeaderFont': require('./assets/fonts/Poppins-SemiBold.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // show splash screen or spinner if desired
  }

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Home");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const preloaderFlag = useSelector((state) => state.preloader);
  const [isDrawerActive, setDrawerActive] = useState(false);
  const [isStartingAdAlreadyFired, setStartingAdAlreadyFired] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Check network connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected && state.isInternetReachable !== false);
    });
    return () => unsubscribe();
  }, []);

  // Save user data if logged in
  useEffect(() => {
    if (!userData?.uid && isLoggedIn === false) return;

    const saveTimeout = setTimeout(() => {
      dispatch(saveUserData(userData));
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [userData]);

  const renderView = () => {
    switch (activeTab) {
      case "Home":
        return <Home isStartingAdAlreadyFired={isStartingAdAlreadyFired} setStartingAdAlreadyFired={setStartingAdAlreadyFired} />;
      case "Skincare":
        return <SkincareListView />;
      case "Routines":
        return <RoutinesView />;
      case "Map":
        return <LocationComponent />;
      case "Face Diary":
        return <FaceDiaryView />;
      case "Profile":
        return <Profile />;
      case "Chat":
        return <Inbox />;
      default:
        return <Home isStartingAdAlreadyFired={isStartingAdAlreadyFired} setStartingAdAlreadyFired={setStartingAdAlreadyFired} />;
    }
  };

  return (
    <SafeAreaView className="w-full relative !text-dark-900 flex-1 bg-white">
      {/* Top offline banner */}
      {!isConnected && (
        <View style={{ backgroundColor: '#f87171', padding: 10, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>No internet connection</Text>
        </View>
      )}

      {preloaderFlag?.toggle && <PreloaderComponent />}

      {isLoggedIn ? (
        <>
          {isDrawerActive && (
            <DrawerComponent
              setActiveTab={setActiveTab}
              setDrawerActive={setDrawerActive}
              setLoggedIn={setLoggedIn}
            />
          )}
          <Header setActiveTab={setActiveTab} setDrawerActive={setDrawerActive} />
          {renderView()}
          <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      ) : (
        <AuthenticationForm setLoggedIn={setLoggedIn} />
      )}

      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}
