import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_GET_QUOTE_LIST = " http://localhost:3000/DataQuoteLists";

const initialState = {
    quote: []
};

export const quoteListSlice = createSlice({
    name: "quoteList",
    initialState,
    reducers: {
        getQuoteList: (state, action) => {
            state.quote = action.payload;
        },


        deleteQuote: (state, action) => {
            state.quote = state.quote.filter((data) => data.id !== action.payload.id)
        },

        updateQuote: (state, action) => {
            state.quote = state.quote.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
        },
        postQuote: (state, action) => {
            console.log(11111, action.payload)
            state.quote.unshift(action.payload);
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
    try {
        axios
            .delete(`${API_URL_GET_QUOTE_LIST}/${id}`)
            .then((response) => {
                dispatch(quoteListSlice.actions.deleteQuote(response))
            }).catch(function (error) {
            console.log(error)
        })
    } catch (err) {
        console.log(err)
    }
}

export const updateQuoteApi = (id, params) => async (dispatch) => {
    try {
        axios
            .put(`${API_URL_GET_QUOTE_LIST}/${id}`, params)
            .then((response) => {
                dispatch(quoteListSlice.actions.updateQuote(response))
            }).catch(function (error) {
            console.log(error)
        })
    } catch (err) {
        console.log(err)
    }
}

export const postQuoteApi = (...params) => async (dispatch) => {
    try {
        axios.post('http://localhost:3000/DataQuoteLists', {
            params
        }).then(function (response) {
            console.log(2222, response.data.params)
            dispatch(quoteListSlice.actions.postQuote(response.data.params))
        }).catch(function (error) {
            console.log(error);
        });
    } catch (err) {
        console.log(err)
    }
}


export default quoteListSlice.reducer;
