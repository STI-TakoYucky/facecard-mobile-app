import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';

// Async thunk to save user data to Firebase
export const saveUserData = createAsyncThunk(
  'userData/saveUserData',
  async (userData, { rejectWithValue }) => {
    try {
      const userId = userData.uid;
      if (!userId) {
        throw new Error("UID is missing from user data");
      }

      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, userData); // Save data to Firestore
      return userData; // ✅ return the saved data
    } catch (error) {
      console.error("Error saving user data to Firebase:", error);
      return rejectWithValue(error.message);
    }
  }
);

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {},
    reducers: {
        storeUser: (state, action) => {
            return action.payload
        },
        updateMainMarkedDates: (state, action) => {
        const markedDates = action.payload
        state.markedDates = markedDates
       },
       updateUserSchedules: (state, action) => {
        const schedules = action.payload
        state.routineSchedules = schedules
       },
       updateUserInfo: (state, action) => {
        const {firstName, lastName, birthdate } = action.payload
        state.firstName = firstName
        state.lastName = lastName
        state.birthday = birthdate
       },
       updateProfilePicture: (state, action) => {
        state.profilePicture = action.payload
       },
       setUserLocation: (state, action) => {
        const data = action.payload
        state.location = {
          coordinates: data.location,
          isScheduled: data.schedule
        }
       },
       setUserPremiumAcc: (state, action) => {
        const data = action.payload
        state.isPremiumAcc = data;
       },
       sendMessage: (state, action) => {
        const { dermatologistUID, data } = action.payload;

        // Ensure `messages` exists
        if (!state.messages) {
          state.messages = {};
        }

        // Ensure there's an array for this dermatologist
        if (!state.messages[dermatologistUID]) {
          state.messages[dermatologistUID] = [];
        }

        // Add message to the correct thread
        state.messages[dermatologistUID].push(data);
      }
    }
})

export const { storeUser, updateMainMarkedDates, updateUserSchedules, updateUserInfo, updateProfilePicture, setUserLocation, setUserPremiumAcc, sendMessage } = userDataSlice.actions;
export default userDataSlice.reducer;