// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import markedDatesSlice from './markedDatesSlice/markedDatesSlice.js'
import routineSchedules from './routineSchedulesSlice/routineSchedulesSlice.js'
import preloaderSlice from './PreloaderSlice/PreloaderSlice.js'

const store = configureStore({
  reducer: {
    markedDates: markedDatesSlice,
    routineSchedules: routineSchedules,
    preloader: preloaderSlice
  }
});

export default store;
