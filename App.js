
import { SafeAreaView} from 'react-native';
import { useState } from 'react';
import Header from './components/Header';
import Home from './components/Tabs/HomeView'
import "./global.css"
import BottomNavbar from './components/BottomNavbar';
import SkincareListView from './components/Tabs/SkincareListView';
import RoutinesView from './components/Tabs/RoutinesView';
import FaceDiaryView from './components/Tabs/FaceDiaryView';
import LocationComponent from './components/Screens/LocationComponent';
import {Provider} from 'react-redux'
import store from './state/store.js'
import AuthenticationForm from './components/Screens/AuthenticationForm.js'

export default function App() {

  const [activeTab, setActiveTab] = useState("Home");
  const [isLoggedIn, setLoggedIn] = useState(false);
  
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
    
      default:
        return <Home></Home>
    }
  }

  return (
    <Provider store={store}>
      <SafeAreaView className="w-full !text-dark-900 flex-1 bg-white">
        {isLoggedIn ? (
          <>
            <Header setActiveTab={setActiveTab} />
            {renderView()}
            <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        ) : (
          <AuthenticationForm setLoggedIn={setLoggedIn} />
        )}
      </SafeAreaView>
    </Provider>
  );
}
