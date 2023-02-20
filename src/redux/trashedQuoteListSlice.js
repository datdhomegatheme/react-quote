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

        deleteTrashQuote: (state, action) => {
            state.data = state.data.filter((data)=> data.id !== action.payload.id)
        }

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

export const deleteTrashedQuote = (id) => async(dispatch) => {
    try{
        axios
            .delete(`${API_URL_GET_TRASHED_QUOTE_LIST}/${id}`)
            .then((response)=> {
                dispatch(trashedQuoteListSlice.actions.deleteTrashQuote(response))
            }).catch(function (error){
                console.log(error)
        })
    }catch(err){
        console.log(err)
    }
}

export default trashedQuoteListSlice.reducer;