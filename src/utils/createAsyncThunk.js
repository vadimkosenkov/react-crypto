import { createAsyncThunk } from "@reduxjs/toolkit";

const { REACT_APP_PROXY, REACT_APP_API, REACT_APP_API_KEY } = process.env;

export const fetchAssets = createAsyncThunk(
  "cryptoList/fetchAssets",
  async ([limit, offset], { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${REACT_APP_PROXY}/${REACT_APP_API}/v2/assets?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          redirect: "follow",
          headers: {
            Authorization: `Bearer ${REACT_APP_API_KEY}`,
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
        `${REACT_APP_PROXY}/${REACT_APP_API}/v2/assets/${id}/history?interval=d1`,
        {
          method: "GET",
          redirect: "follow",
          headers: {
            Authorization: `Bearer ${REACT_APP_API_KEY}`,
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
        `${REACT_APP_PROXY}/${REACT_APP_API}/v2/assets/${id}`,
        {
          method: "GET",
          redirect: "follow",
          headers: {
            Authorization: `Bearer ${REACT_APP_API_KEY}`,
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

export const fetchList = createAsyncThunk(
  "cryptoList/fetchList",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${REACT_APP_PROXY}/${REACT_APP_API}/v2/assets?ids=${ids}`,
        {
          method: "GET",
          redirect: "follow",
          headers: {
            Authorization: `Bearer ${REACT_APP_API_KEY}`,
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
