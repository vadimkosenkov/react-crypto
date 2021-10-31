import { createSlice } from "@reduxjs/toolkit";

const cryptoListSlice = createSlice({
  name: "cryptoList",
  initialState: {
    assets: [],
    currentHistory: [],
    currentCrypto: {},
  },
  reducers: {
    getAssets(state, action) {
      state.assets = [];
      state.assets.push(...action.payload);
    },
    setCurrentCrypto(state, action) {
      state.currentCrypto = action.payload;
    },
    getCurrentHistory(state, action) {
      state.currentHistory = action.payload;
    },
  },
});

export default cryptoListSlice.reducer;
export const { getAssets, setCurrentCrypto, getCurrentHistory } =
  cryptoListSlice.actions;
