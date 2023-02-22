import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_GET_DATA_PRODUCTS = "http://localhost:3000/DataProducts";

const initialState = { product: []};
export const dataProductsSlice = createSlice({
    name: "dataProducts",
    initialState,
    reducers: {
        getDataProducts: (state, action) => {
            state.product = action.payload;
        },
    },

});

export const getDataProducts = () => async(dispatch) => {
    try{
        axios
            .get(API_URL_GET_DATA_PRODUCTS)
            .then((response) => {
                dispatch(dataProductsSlice.actions.getDataProducts(response.data));
            })
            .catch(function(error){
                console.log(error);
            })
    } catch(err){
        console.log(err);
    }
}

export default dataProductsSlice.reducer;