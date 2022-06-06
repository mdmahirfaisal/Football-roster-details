import { configureStore } from '@reduxjs/toolkit';
import footballTeamReducer from './slices/footballTeam';

export const store = configureStore({
    reducer: {
        footballTeam: footballTeamReducer,

    },
})

