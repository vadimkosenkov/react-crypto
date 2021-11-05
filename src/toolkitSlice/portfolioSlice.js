import { createSlice } from "@reduxjs/toolkit";
import { fetchList } from "../utils/createAsyncThunk";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    result: {},
    list: [],
    updatedList: [],
    status: null,
    error: null,
  },
  reducers: {
    addCrypto(state, action) {
      const currentItem = state.list.find(
        (elem) => elem.id === action.payload.id
      );

      if (currentItem) {
        state.list = state.list.map((elem) =>
          elem.id === currentItem.id
            ? { ...elem, amount: +elem.amount + +action.payload.amount }
            : elem
        );
      } else {
        state.list.push(action.payload);
      }
    },
    addResult(state, action) {
      state.result = action.payload;
    },
    deleteItem(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
    setListFromLocalStorage(state, action) {
      state.list = action.payload;
    },
  },
  extraReducers: {
    [fetchList.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchList.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.updatedList = action.payload;
    },
    [fetchList.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default portfolioSlice.reducer;
export const {
  addCrypto,
  addResult,
  setListFromLocalStorage,
  deleteItem,
} = portfolioSlice.actions;
