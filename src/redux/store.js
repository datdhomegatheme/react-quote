import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counterSlice";

export const store = configureStore({
    var quoteListApi = "http://localhost:3000/DataQuoteLists";

    reducer: {
        getQuoteList: getQuoteListSlice,
    },
});
