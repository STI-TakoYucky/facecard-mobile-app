// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import markedDatesSlice from './markedDatesSlice/markedDatesSlice.js'
import routineSchedules from './routineSchedulesSlice/routineSchedulesSlice.js'

const store = configureStore({
  reducer: {
    markedDates: markedDatesSlice,
    routineSchedules: routineSchedules
  }
});

export default store;
