import { configureStore } from '@reduxjs/toolkit'
import rosterReducer from './slices/rosterSlice'

export const store = configureStore({
    reducer: {
        roster: rosterReducer,

    },
})