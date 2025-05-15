import { configureStore, combineReducers } from '@reduxjs/toolkit';
import markedDatesSlice from './markedDatesSlice/markedDatesSlice.js';
import routineSchedules from './routineSchedulesSlice/routineSchedulesSlice.js';
import preloaderSlice from './PreloaderSlice/PreloaderSlice.js';
import userDataSlice from './userDataSlice/userDataSlice.js';

// 1. Combine your slices
const appReducer = combineReducers({
  markedDates: markedDatesSlice,
  routineSchedules: routineSchedules,
  preloader: preloaderSlice,
  userData: userDataSlice,
});

// 2. Wrap with rootReducer to reset on logout
const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    state = undefined; // resets entire redux state to initial states of slices
  }
  return appReducer(state, action);
};

// 3. Configure store with the rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;
