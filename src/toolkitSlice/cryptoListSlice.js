import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAssets,
  fetchHistory,
  fetchElem,
} from "../utils/createAsyncThunk";

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const setLoading = (state) => {
  state.status = "loading";
  state.error = null;
};

const cryptoListSlice = createSlice({
  name: "cryptoList",
  initialState: {
    assets: [],
    currentHistory: [],
    currentElem: {},
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAssets.pending]: setLoading,
    [fetchHistory.pending]: setLoading,
    [fetchElem.pending]: setLoading,

    [fetchAssets.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.assets = action.payload;
    },
    [fetchHistory.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.currentHistory = action.payload;
    },
    [fetchElem.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.currentElem = action.payload;
    },
    [fetchAssets.rejected]: setError,
    [fetchHistory.rejected]: setError,
    [fetchElem.rejected]: setError,
  },
});

export default cryptoListSlice.reducer;
