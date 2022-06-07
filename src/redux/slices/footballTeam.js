import { createSlice } from '@reduxjs/toolkit'


export const footballTeamSlice = createSlice({
    name: 'roster',
    initialState: {
        allRosterData: null,
    },
    reducers: {
        handleLoadCSVData: (state, { payload }) => {
            state.allRosterData = payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { handleLoadCSVData } = footballTeamSlice.actions

export default footballTeamSlice.reducer