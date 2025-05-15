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
    }

})

export const { storeUser, updateMainMarkedDates, updateUserSchedules } = userDataSlice.actions;
export default userDataSlice.reducer;

// whole document sample
//{"birthday": "05/14/2025", "isPremiumAcc": false, "markedDates": {}, "name": "Test Account", "profilePicture": "", "routineSchedules": [[Object], [Object], [Object], [Object]], "savedProducts": [], "streak": 0}