import { configureStore } from "@reduxjs/toolkit";
import quoteListSlice from "./quoteListSlice";

export const store = configureStore({
    reducer: {
        quoteList: quoteListSlice,
    },
});
