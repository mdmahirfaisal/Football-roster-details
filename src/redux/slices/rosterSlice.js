import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    getCsvData: [],
    isEmptyValueFile: false,
    importedCsvData: [],
    searchResultData: [],
    formationMissingData: false,
    formationSelectedData: [],
}

export const rosterSlice = createSlice({
    name: 'roster',
    initialState,
    reducers: {
        // get csv data
        handleGetCsvData: (state, { payload }) => {
            state.getCsvData = payload
        },
        // check is empty value in csv file
        handleIsEmptyValueFile: (state, { payload }) => {
            state.isEmptyValueFile = payload
        },
        // import csv data and display in table
        handleImportedCsvData: (state, { payload }) => {
            state.importedCsvData = payload
        },
        // Edit player
        handleEditPlayerData: (state, { payload }) => {
            const index = state.importedCsvData.findIndex((el) => el[10] === payload[10])
            state.importedCsvData[index] = payload
        },

        /// filter search  ///
        handleSearchByPlayerName: (state, { payload }) => {
            state.searchResultData = state.importedCsvData?.filter(player => (player[0].toUpperCase().includes(payload.toUpperCase()) || player[3].toLowerCase().includes(payload.toLowerCase())))
        },
        /// remove search  ///
        handleRemoveSearch: (state) => {
            state.searchResultData = []
        },

        /// handle data missing in formation ///
        handleFormationMissingData: (state, { payload }) => {
            state.formationMissingData = payload
        },

        /// handle formation active selected data ///
        handleFormationSelectedData: (state, { payload }) => {
            state.formationSelectedData = payload
        },


    },
})

// Action creators are generated for each case reducer function
export const { handleImportedCsvData, handleGetCsvData, handleIsEmptyValueFile, handleEditPlayerData, handleSearchByPlayerName, handleRemoveSearch, handleFormationMissingData, handleFormationSelectedData } = rosterSlice.actions

export default rosterSlice.reducer