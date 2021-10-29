import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    result: {},
    list: [],
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
    setListToLocalStorage(state, action) {
      state.list = action.payload;
    },
  },
});

export default portfolioSlice.reducer;
export const { addCrypto, addResult, setListToLocalStorage, deleteItem } =
  portfolioSlice.actions;
