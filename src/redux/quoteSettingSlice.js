import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    oldSettingValue: [],
    currentSettingValue: []
}

export const quoteSettingSlice = createSlice({
    name:"quoteSetting",
    initialState,
    reducers: {
        oldSetting : (state, action) => {
            state.oldSettingValue = action.payload
        },
        currentSetting : (state, action) => {
            state.currentSettingValue = action.payload
        },

        updateCurrentSetting: (state, action) => {
            state.currentSettingValue = state.currentSettingValue.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
        },
    },

})

export const { oldSetting, currentSetting, updateCurrentSetting } = quoteSettingSlice.actions

export default quoteSettingSlice.reducer