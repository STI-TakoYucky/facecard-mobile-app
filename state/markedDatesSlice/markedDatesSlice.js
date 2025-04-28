import { createSlice } from '@reduxjs/toolkit';

const markedDatesSlice = createSlice({
  name: 'markedDates',
  initialState: {},
  reducers: {
    addDate: (state, action) => {
        const { date, routines } = action.payload;
        state[date] = {
            routines: {
                Cleanser: routines.Cleanser || false,
                Moisturizer: routines.Moisturizer || false,
                Exfoliate: routines.Exfoliate || false,
                Serum: routines.Serum || false
              }
          };
      },
  }
});

export const { addDate } = markedDatesSlice.actions;
export default markedDatesSlice.reducer;
