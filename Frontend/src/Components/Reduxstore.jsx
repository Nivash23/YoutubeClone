import { configureStore } from "@reduxjs/toolkit";
import Details from './Reduxslice'

export const commonstore = configureStore({
    reducer: {
        statelists:Details
    }
})