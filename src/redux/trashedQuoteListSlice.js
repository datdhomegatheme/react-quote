import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_GET_TRASHED_QUOTE_LIST = " http://localhost:3000/DataTrashedQuoteLists";

const initialState = { data: []};

export const trashedQuoteListSlice = createSlice({
    name: "trashQuoteList",
    initialState,
    reducers: {
        getTrashedQuoteList: (state, action) => {
            state.data = action.payload;
        },

    },
});

export const getTrashedQuoteList = () => async(dispatch) => {
    try{
        axios
            .get(API_URL_GET_TRASHED_QUOTE_LIST)
            .then((response) => {
                dispatch(trashedQuoteListSlice.actions.getTrashedQuoteList(response.data));
            })
            .catch(function(error){
                console.log(error);
            })
    } catch(err){
        console.log(err);
    }
}

export default trashedQuoteListSlice.reducer;