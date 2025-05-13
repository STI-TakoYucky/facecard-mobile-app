import { createSlice } from "@reduxjs/toolkit";

const routineSchedulesSlice = createSlice({
  name: "routineSchedules",
  initialState: [
    {
      name: "Cleanser",
      schedules: [],
      startDate: "2025-04-24",
    },
    {
      name: "Moisturizer",
      schedules: [],
      startDate: "2025-04-24",
    },
    {
      name: "Exfoliate",
      schedules: [],
      startDate: "2025-04-24",
    },
    {
      name: "Serum",
      schedules: [],
      startDate: "2025-04-24",
    },
  ],
  reducers: {
    setSchedules: (state, action) => {
      const { name, schedules } = action.payload

      const selectedRoutine = state.find(item => item.name === name);
      const existingRoutine = selectedRoutine.schedules.findIndex(item => item.id === schedules.id);

      if(existingRoutine !== -1) {
         selectedRoutine.schedules[existingRoutine] = schedules;
         return;
      }

      selectedRoutine.schedules.push(schedules);
    },
  },
});

export const { setSchedules } = routineSchedulesSlice.actions;
export default routineSchedulesSlice.reducer;
