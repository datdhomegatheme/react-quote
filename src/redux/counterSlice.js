import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_GET_QUOTE_LIST = "http://localhost:3000/DataQuoteLists";

export const quoteListSlice = createSlice({
    name: "quoteList",
    initialState: {
        data: [],
    },
    reducers: {
        getQuoteList: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const getQuoteListApi = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL_GET_QUOTE_LIST}`);
        dispatch(getQuoteList(response.data));
    } catch (err) {
        console.log(err);
    }
};
// Action creators are generated for each case reducer function
export const { getQuoteList } = quoteListSlice.actions;
export default quoteListSlice.reducer;
