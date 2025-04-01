
import { SafeAreaView} from 'react-native';
import { useState } from 'react';

import Header from './components/Header';
import Home from './components/HomeView'
import "./global.css"
import BottomNavbar from './components/BottomNavbar';
import SkincareListView from './components/SkincareListView';
import RoutinesView from './components/RoutinesView';
import FaceDiaryView from './components/FaceDiaryView';

export default function App() {

  const [activeTab, setActiveTab] = useState("Home");
  
  const renderView = () => {
    switch (activeTab) {
      case "Home":
        return <Home></Home>
        break;

      case "Skincare":
        return <SkincareListView></SkincareListView>
        break;
      
      case "Routines":
        return <RoutinesView></RoutinesView>
        break;

      case "Face Diary":
        return <FaceDiaryView></FaceDiaryView>
        break;
    
      default:
        return <Home></Home>
        break;
    }
  }

  return (
    <SafeAreaView className="w-full text-dark-900">
      <Header></Header>
      {renderView()}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab}></BottomNavbar>
    </SafeAreaView>
  );
}
