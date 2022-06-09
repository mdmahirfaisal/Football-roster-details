import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    getCsvData: [],
    importedCsvData: [],
    searchResultData: [],
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

        /// filter search  ///
        handleSearchByPlayerName: (state, { payload }) => {
            state.searchResultData = state.importedCsvData?.filter(player => (player[0].toUpperCase().includes(payload.toUpperCase()) || player[3].toLowerCase().includes(payload.toLowerCase())))
        },
        /// remove search  ///
        handleRemoveSearch: (state) => {
            state.searchResultData = []
        },

    },
})

// Action creators are generated for each case reducer function
export const { handleImportedCsvData, handleGetCsvData, handleEditPlayerData, handleSearchByPlayerName, handleRemoveSearch } = rosterSlice.actions

export default rosterSlice.reducer