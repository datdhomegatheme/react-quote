import { configureStore } from "@reduxjs/toolkit";
import quoteListSlice from "./quoteListSlice";
import trashedQuoteListSlice from "./trashedQuoteListSlice";
import dataProductsSlice from "./dataProductsSlice";
import quoteSettingSlice from "./quoteSettingSlice";
import abandonedQuoteListSlice from"./abandonedQuoteListSlice";

export const store = configureStore({
    reducer: {
        quoteList: quoteListSlice,
        trashedQuoteList: trashedQuoteListSlice,
        abandonedQuoteList: abandonedQuoteListSlice,
        dataProducts: dataProductsSlice,
        quoteSetting: quoteSettingSlice,
    },

});

