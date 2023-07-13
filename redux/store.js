import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./darkModeSlice";
import langSlice from './langSlice'



const store = configureStore({
    reducer: {
        darkMode: darkModeSlice,
        language: langSlice,
    }
})

export default store