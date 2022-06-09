import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    getCsvData: [],
    importedCsvData: [],
    editPlayerData: {},
}

export const rosterSlice = createSlice({
    name: 'roster',
    initialState,
    reducers: {
        handleGetCsvData: (state, { payload }) => {
            state.getCsvData = payload
        },
        handleImportedCsvData: (state, { payload }) => {
            state.importedCsvData = payload
        },

        handleEditPlayerData: (state, { payload }) => {
            state.editPlayerData = payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { handleImportedCsvData, handleGetCsvData, handleEditPlayerData } = rosterSlice.actions

export default rosterSlice.reducer