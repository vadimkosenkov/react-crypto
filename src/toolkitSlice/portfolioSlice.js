import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    result: {},
    list: [],
  },
  reducers: {
    addCrypto(state, action) {
      state.list.push(action.payload);
    },
    addResult(state, action) {
      state.result = action.payload;
    },
  },
});

export default portfolioSlice.reducer;
export const { addCrypto, addResult } = portfolioSlice.actions;
