import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {currentSetting, oldSetting} from "./quoteSettingSlice";

const API_URL_GET_QUOTE_LIST = "http://localhost:3000/DataQuoteLists";

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
            state.quote.unshift(action.payload);
        }
    },

});

export const {getQuoteList} = quoteListSlice.actions

export const getQuoteListApi = () => async (dispatch) => {
    try {
        axios
            .get(API_URL_GET_QUOTE_LIST)
            .then((response) => {
                dispatch(quoteListSlice.actions.getQuoteList(response.data));
                dispatch(oldSetting(response.data))
                dispatch(currentSetting(response.data))
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

export const updateQuoteApi = (id, ...params) => async (dispatch) => {
    try {
        const param = params[0]
        axios
            .put(`${API_URL_GET_QUOTE_LIST}/${id}`, param)
            .then((response) => {
                dispatch(quoteListSlice.actions.updateQuote(response.data))
            })
            .catch(function (error) {
            console.log(error)
        })
    } catch (err) {
        console.log(err)
    }
}



export const postQuoteApi = (...params) => async (dispatch) => {
    try {
        const param = params[0]
        axios.put('http://localhost:3000/DataQuoteLists',
            param
        ).then(function (response) {
            dispatch(quoteListSlice.actions.postQuote(response.data))
        }).catch(function (error) {
            console.log(error);
        });
    } catch (err) {
        console.log(err)
    }
}


export default quoteListSlice.reducer;
