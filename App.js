
import { SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Home from './components/Tabs/HomeView'
import "./global.css"
import BottomNavbar from './components/BottomNavbar';
import SkincareListView from './components/Tabs/SkincareListView';
import RoutinesView from './components/Tabs/RoutinesView';
import FaceDiaryView from './components/Tabs/FaceDiaryView';
import LocationComponent from './components/Screens/LocationComponent';
import {Provider, useDispatch} from 'react-redux'
import store from './state/store.js'
import AuthenticationForm from './components/Screens/AuthenticationForm.js'
import { useSelector } from 'react-redux';
import PreloaderComponent from './components/PreloaderComponent.js';
import Toast from 'react-native-toast-message';
import { toastConfig } from './components/ToastConfig.js';
import DrawerComponent from './components/DrawerComponent.js';
import Profile from './components/Screens/Profile.js';
import { saveUserData } from './state/userDataSlice/userDataSlice.js';

export default function App() {

  return (
    <Provider store={store}>
      <AppContent/>
    </Provider>
  )
}

function AppContent() {

  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userData?.uid && isLoggedIn == false) return; // only save if uid exists

    const saveTimeout = setTimeout(() => {
      dispatch(saveUserData(userData));
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [userData]);

  const [activeTab, setActiveTab] = useState("Home");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const preloaderFlag = useSelector((state) => state.preloader);
  const [isDrawerActive, setDrawerActive] = useState(false);
  
  const renderView = () => {
    switch (activeTab) {
      case "Home":
        return <Home></Home>

      case "Skincare":
        return <SkincareListView></SkincareListView>
      
      case "Routines":
        return <RoutinesView></RoutinesView>
      
      case "Map":
        return <LocationComponent></LocationComponent>

      case "Face Diary":
        return <FaceDiaryView></FaceDiaryView>

      case "Profile":
      return <Profile/>
    
      default:
        return <Home></Home>
    }
  }

  return (
      <SafeAreaView className="w-full relative !text-dark-900 flex-1 bg-white">

          { preloaderFlag?.toggle && (<PreloaderComponent></PreloaderComponent>) } 
          
          {isLoggedIn ? (
            <>
            { isDrawerActive && <DrawerComponent setActiveTab={setActiveTab} setDrawerActive={setDrawerActive} setLoggedIn={setLoggedIn}></DrawerComponent> }
              <Header setActiveTab={setActiveTab} setDrawerActive={setDrawerActive}/>
              {renderView()}
              <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
            </>
          ) : ( <AuthenticationForm setLoggedIn={setLoggedIn} /> )}

            <Toast config={toastConfig}/>

      </SafeAreaView>
  );
}
