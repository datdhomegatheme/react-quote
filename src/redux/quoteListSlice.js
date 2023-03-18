import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {currentSetting, oldSetting} from "./quoteSettingSlice";

const API_URL_GET_QUOTE_LIST = "http://localhost:3000/DataQuoteLists";

const initialState = {
    quote: [],
    limit: 10,
    currentPage: 1,
    filter: "",
    salesPerson: "",
};


export const quoteListSlice = createSlice({
    name: "quoteList",
    initialState,
    reducers: {
        getQuoteList: (state, action) => {
            state.quote = action.payload;
            state.limit = action.payload.limit;
            state.currentPage = action.payload.currentPage;
            state.filter = action.payload.filter;
            state.salesPerson= action.payload.salesPerson;
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
        },

        hasError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {getQuoteList} = quoteListSlice.actions

export const getQuoteListFilterApi = (currentPage, limit, search, filter, salesPerson) => async (dispatch) => {
    const queryParams = `
    &currentPage=${currentPage} 
    &limit=${limit} 
    &search=${search} 
    &filter=${filter} 
    &sale_person=${salesPerson}`;
    try {
        axios
            .get(`${API_URL_GET_QUOTE_LIST}?${queryParams}`)
            .then((response) => {
                dispatch(quoteListSlice.actions.getQuoteList(response.data));
            })
    } catch (error) {
        dispatch(quoteListSlice.actions.hasError(error));
    }

}
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

export const deleteQuoteApi2 = (id) => async (dispatch) => {
    try {
        axios
            .post(`${API_URL_GET_QUOTE_LIST}/deleteSeletedQuote`, {id: [id]})
            .catch(function (error) {
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

export const deleteQuoteAll = () => async (dispatch) => {
    try {
        axios
            .post(`${API_URL_GET_QUOTE_LIST}/deleteAllQuote`)
            .then((response) => {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    } catch (err) {
        console.log(err)
    }
}


export default quoteListSlice.reducer;
