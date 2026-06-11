// API doc: https://pro.coincap.io/api-docs
// Local run with netlify CLI https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAssets = createAsyncThunk(
  "cryptoList/fetchAssets",
  async ([limit, offset], { rejectWithValue }) => {
    try {
      const response = await fetch(
        // Changing the URL to use Netlify proxy, check netlify.toml for details
        `/api/assets?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          redirect: "follow"
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
      // Changing the URL to use Netlify proxy, check netlify.toml for details
      const response = await fetch(
        `/api/assets/${id}/history?interval=d1`,
        {
          method: "GET",
          redirect: "follow"
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
      // Changing the URL to use Netlify proxy, check netlify.toml for details
      const response = await fetch(
        `/api/assets/${id}`,
        {
          method: "GET",
          redirect: "follow"
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
      // Changing the URL to use Netlify proxy, check netlify.toml for details
      const response = await fetch(
        `/api/assets?ids=${ids}`,
        {
          method: "GET",
          redirect: "follow"
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
