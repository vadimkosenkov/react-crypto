import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAssets = createAsyncThunk(
  "cryptoList/fetchAssets",
  async ([limit, offset], { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://powerful-eyrie-68033.herokuapp.com/https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`,
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

export const fetchHistory = createAsyncThunk(
  "cryptoList/fetchHistory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://powerful-eyrie-68033.herokuapp.com/https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
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

export const fetchElem = createAsyncThunk(
  "cryptoList/fetchElem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://powerful-eyrie-68033.herokuapp.com/https://api.coincap.io/v2/assets/${id}`,
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
