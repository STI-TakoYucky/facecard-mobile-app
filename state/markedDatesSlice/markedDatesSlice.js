import { createSlice } from '@reduxjs/toolkit';

const markedDatesSlice = createSlice({
  name: 'markedDates',
  initialState: {},
  reducers: {
    addDate: (state, action) => {
        const { date, routines } = action.payload;

        if (routines.Cleanser == false && routines.Moisturizer == false && routines.Exfoliate == false && routines.Serum == false) {
          delete state[date];
        } else {
          state[date] = {
            routines: {
                Cleanser: routines.Cleanser || false,
                Moisturizer: routines.Moisturizer || false,
                Exfoliate: routines.Exfoliate || false,
                Serum: routines.Serum || false
              }
          };
        }
      },
    initDates: (state, action) => {
      const data = action.payload;
      return {...data}
    }
  }
});

export const { addDate, initDates } = markedDatesSlice.actions;
export default markedDatesSlice.reducer;
