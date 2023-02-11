import { configureStore } from "@reduxjs/toolkit";
import quoteListSlice from "../redux/counterSlice";

export const store = configureStore({
    reducer: {
        QuoteList: quoteListSlice,
    },
});
