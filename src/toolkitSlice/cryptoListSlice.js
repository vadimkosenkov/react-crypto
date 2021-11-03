import { createSlice } from "@reduxjs/toolkit";

const cryptoListSlice = createSlice({
  name: "cryptoList",
  initialState: {
    assets: [],
    currentHistory: [],
    currentElem: {},
    loader: false,
  },
  reducers: {
    getAssets(state, action) {
      state.assets = [];
      state.assets.push(...action.payload);
    },
    setCurrentElem(state, action) {
      state.currentElem = action.payload;
    },
    setCurrentHistory(state, action) {
      state.currentHistory = action.payload;
    },
    setLoader(state, action) {
      state.loader = action.payload;
    },
  },
});

export default cryptoListSlice.reducer;
export const { getAssets, setCurrentElem, setCurrentHistory, setLoader } =
  cryptoListSlice.actions;
