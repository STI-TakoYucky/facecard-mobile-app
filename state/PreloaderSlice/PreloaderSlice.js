import { createSlice } from "@reduxjs/toolkit";

const preloaderSlice = createSlice({
    name: "preloader",
    initialState: {
        toggle: false,
        message: null
    },
    reducers: {
        togglePreloader: (state, action) => {
            let message;
            if(action.payload) {
                message  = action.payload.message
            }

            state.toggle = !state.toggle
            state.message = message
        }
    }
})

export const { togglePreloader } = preloaderSlice.actions
export default preloaderSlice.reducer