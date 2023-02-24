import { configureStore } from "@reduxjs/toolkit";
import quoteListSlice from "./quoteListSlice";
import trashedQuoteListSlice from "./trashedQuoteListSlice";
import dataProductsSlice from "./dataProductsSlice";
import quoteSettingSlice from "./quoteSettingSlice";

export const store = configureStore({
    reducer: {
        quoteList: quoteListSlice,
        trashedQuoteList: trashedQuoteListSlice,
        dataProducts: dataProductsSlice,
        quoteSetting: quoteSettingSlice,
    },

});

