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

      const existingRoutine = state.find(item => item.name === name);

      existingRoutine.schedules.push(schedules);
    },
  },
});

export const { setSchedules } = routineSchedulesSlice.actions;
export default routineSchedulesSlice.reducer;
