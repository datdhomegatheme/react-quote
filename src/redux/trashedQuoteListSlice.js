import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_GET_TRASHED_QUOTE_LIST = "http://localhost:3000/DataTrashedQuoteLists";

const initialState = {
    trashQuote: [],
    limit: 10,
    currentPage: 1,
    filter: "",
    salesPerson: "",
};

export const trashedQuoteListSlice = createSlice({
    name: "trashQuoteList",
    initialState,
    reducers: {
        getTrashedQuoteList: (state, action) => {
            state.trashQuote = action.payload;
            state.limit = action.payload.limit;
            state.currentPage = action.payload.currentPage;
            state.filter = action.payload.filter;
            state.salesPerson= action.payload.salesPerson;
        },

        hasError(state, action) {
            state.error = action.payload;
        },

    },
});

export const getTrashedQuoteListFilterApi = (currentPage, limit, search, filter, salesPerson) => async(dispatch) => {
    const queryParams = `
    &currentPage=${currentPage} 
    &limit=${limit} 
    &search=${search} 
    &filter=${filter} 
    &salesPerson=${salesPerson}`;

    try{
        axios
            .get(`${API_URL_GET_TRASHED_QUOTE_LIST}?${queryParams}`)
            .then((response) => {
                dispatch(trashedQuoteListSlice.actions.getTrashedQuoteList(response.data));
            })
    } catch(error){
        dispatch(trashedQuoteListSlice.actions.hasError(error));
    }
}

export const deleteTrashedQuote = (id) => async(dispatch) => {
    try{
        axios
            .delete(`${API_URL_GET_TRASHED_QUOTE_LIST}/${id}`)
            .then((response)=> {
                // dispatch(trashedQuoteListSlice.actions.deleteTrashQuote(response))
            }).catch(function (error){
                console.log(error)
        })
    }catch(err){
        console.log(err)
    }
}



export default trashedQuoteListSlice.reducer;