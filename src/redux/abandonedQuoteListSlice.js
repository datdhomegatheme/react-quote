import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_GET_ABANDONED_QUOTE_LIST = "http://localhost:3000/DataAbandonedQuoteLists";

const initialState = {
    abandonedQuote: [],
    limit: 10,
    currentPage: 1,
    filter: "",
};

export const abandonedQuoteListSlice = createSlice({
    name: "abandonedQuoteList",
    initialState,
    reducers: {
        getAbandonedQuoteList: (state, action) => {
            state.abandonedQuote = action.payload;
            state.limit = action.payload.limit;
            state.currentPage = action.payload.currentPage;
            state.filter = action.payload.filter;
        },

        hasError(state, action) {
            state.error = action.payload;
        },

    },
});

export const getAbandonedQuoteListFilterApi = (currentPage, limit, search, filter) => async(dispatch) => {
    const queryParams = `
    &currentPage=${currentPage} 
    &limit=${limit} 
    &search=${search} 
    &filter=${filter} 
 `;

    try{
        axios
            .get(`${API_URL_GET_ABANDONED_QUOTE_LIST}?${queryParams}`)
            .then((response) => {
                dispatch(abandonedQuoteListSlice.actions.getAbandonedQuoteList(response.data));
            })
    } catch(error){
        dispatch(abandonedQuoteListSlice.actions.hasError(error));
    }
}

export const deleteAbandonedQuote = (id) => async(dispatch) => {
    try{
        axios
            .delete(`${API_URL_GET_ABANDONED_QUOTE_LIST}/${id}`)
            .then((response)=> {
                // dispatch(abandonedQuoteListSlice.actions.deleteAbandonedQuote(response))
            }).catch(function (error){
            console.log(error)
        })
    }catch(err){
        console.log(err)
    }
}



export default abandonedQuoteListSlice.reducer;