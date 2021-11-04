import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchList = createAsyncThunk(
  "cryptoList/fetchList",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://powerful-eyrie-68033.herokuapp.com/https://api.coincap.io/v2/assets?ids=${ids}`,
        {
          method: "GET",
          redirect: "follow",
          headers: {
            Authorization: "Bearer aa2bafd7-e4d7-45e7-aa55-208e683a85f9",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Server Error");
      }
      const json = await response.json();
      return json.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    result: {},
    list: [],
    updatedList: [],
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
export const { addCrypto, addResult, setListFromLocalStorage, deleteItem } =
  portfolioSlice.actions;
