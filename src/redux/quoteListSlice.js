import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_GET_QUOTE_LIST = "http://192.168.11.198:3000/DataQuoteLists";

const initialState = { data: [] };

export const quoteListSlice = createSlice({
    name: "quoteList",
    initialState,
    reducers: {
        getQuoteList: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const getQuoteListApi = () => async (dispatch) => {
    try {
        axios
            .get(API_URL_GET_QUOTE_LIST)
            .then((response) => {
                dispatch(quoteListSlice.actions.getQuoteList(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (err) {
        console.log(err);
    }
};

export default quoteListSlice.reducer;
