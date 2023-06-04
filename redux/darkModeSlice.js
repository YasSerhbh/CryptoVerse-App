import { createSlice } from "@reduxjs/toolkit";



const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: {
        active: false
    },
    reducers: {
        switchState: (state, status) => {
            state.active = status.payload
        }
    }
})

export const {switchState} = darkModeSlice.actions

export default darkModeSlice.reducer