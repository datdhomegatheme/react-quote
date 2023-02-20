import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_GET_QUOTE_LIST = " http://localhost:3000/DataQuoteLists";

const initialState = { data: [] };

export const quoteListSlice = createSlice({
    name: "quoteList",
    initialState,
    reducers: {
        getQuoteList: (state, action) => {
            state.data = action.payload;
        },

        deleteQuote: (state, action)=> {
            state.data =  state.date.filter((data)=> data.id !== action.payload.id)
        }
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
export const deleteQuoteApi = (id) => async (dispatch) => {
    try{
        axios
            .delete(`${API_URL_GET_QUOTE_LIST}/${id}`)
            .then((response)=> {
                dispatch(quoteListSlice.actions.deleteQuote(response))
            }).catch(function (error){
            console.log(error)
        })
    }catch(err){
        console.log(err)
    }
}
export default quoteListSlice.reducer;
