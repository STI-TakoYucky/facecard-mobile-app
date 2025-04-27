import { createSlice } from '@reduxjs/toolkit';

const routineSchedulesSlice = createSlice({
  name: 'routineSchedules',
  initialState: [
    {
      name: "Cleanser",
      schedules: [
      {
        id: 1,
        dayOfWeek: "daily",
        time: "9:00AM"
      },
      {
        id: 2,
        dayOfWeek: 1,
        time: "9:00PM"
      }
    ],
      startDate: "2025-04-24",
    },
    {
      name: "Moisturizer",
      schedules: [
      {
        dayOfWeek: 2,
        time: "9:00AM"
      },
      {
        dayOfWeek: 3,
        time: "9:00PM"
      }
    ],
      startDate: "2025-04-24",
    },
  ],
  reducers: {
    setSchedules: (state, action) => {
        
      },
  }
});

export const { setSchedules } = routineSchedulesSlice.actions;
export default routineSchedulesSlice.reducer;
