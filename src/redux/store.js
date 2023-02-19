import { configureStore } from "@reduxjs/toolkit";
import quoteListSlice from "./quoteListSlice";
import trashedQuoteListSlice from "./trashedQuoteListSlice";

export const store = configureStore({
    reducer: {
        quoteList: quoteListSlice,
        trashedQuoteList: trashedQuoteListSlice,
    },
});
