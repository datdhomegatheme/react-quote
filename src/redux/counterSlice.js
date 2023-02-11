import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

export const quoteListSlice = createSlice({
    name: "quoteList",
    initialState: {
        data: [],
    },
    reducers: {
        getQuoteList: (state, action) => {
            state.data = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
    quoteListSlice.actions;
export default quoteListSlice.reducer;
