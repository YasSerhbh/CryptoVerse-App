import { createSlice } from "@reduxjs/toolkit";



const langSlice = createSlice({
    name: 'language',
    initialState: {
        lang: 'en'
    },
    reducers: {
        switchLang: (state, status) => {
            state.lang = status.payload
        }
    }
})

export const {switchLang} = langSlice.actions

export default langSlice.reducer