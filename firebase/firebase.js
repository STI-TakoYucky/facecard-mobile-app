// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjMkatwUndznDhzpICjTK86gjxIamPggE",
  authDomain: "facecard-mobile-app.firebaseapp.com",
  projectId: "facecard-mobile-app",
  storageBucket: "facecard-mobile-app.firebasestorage.app",
  messagingSenderId: "191253405235",
  appId: "1:191253405235:web:06024580c18ccd4ce18d46",
  measurementId: "G-6SDV8G8609"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app); 
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };