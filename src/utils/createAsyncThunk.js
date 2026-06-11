// API doc: https://pro.coincap.io/api-docs
// Local run with netlify CLI https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/

import { createAsyncThunk } from "@reduxjs/toolkit";

const REACT_APP_API = "https://rest.coincap.io";

const REACT_APP_API_KEY_LOCAL = "70beff4a95b1300eaa02bd37c48aa9e2edffd8fb36834005d0c0c52d6e6ebfae";

// For `netlify dev` and netlify deploy.
const shouldUseNetlifyProxy = () => {
  if (window.location.hostname !== "localhost") {
    return true;
  }
  return window.location.port === "8888";
};

// Helper for API response handling.
const handleApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error("Server Error");
  }
  const json = await response.json();
  return json.data;
};

// Helper for URL generation and headers based on env.
const buildApiConfig = (endpoint, queryString = "") => {
  const query = queryString ? `?${queryString}` : "";
  const isNetlify = shouldUseNetlifyProxy();
  return {
    url: isNetlify ? `/api/${endpoint}${query}` : `${REACT_APP_API}/v3/${endpoint}${query}`,
    headers: isNetlify ? {} : { Authorization: `Bearer ${REACT_APP_API_KEY_LOCAL}` }
  }
};

export const fetchAssets = createAsyncThunk(
  "cryptoList/fetchAssets",
  async ([limit, offset], { rejectWithValue }) => {
    try {
      const { url, headers } = buildApiConfig("assets", `limit=${limit}&offset=${offset}`);

      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers
      });

      return await handleApiResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHistory = createAsyncThunk(
  "cryptoList/fetchHistory",
  async (id, { rejectWithValue }) => {
    try {
      const { url, headers } = buildApiConfig(`assets/${id}/history`, `interval=d1`);

      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers
      });

      return await handleApiResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchElem = createAsyncThunk(
  "cryptoList/fetchElem",
  async (id, { rejectWithValue }) => {
    try {
      const { url, headers } = buildApiConfig(`assets/${id}`);

      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers
      });

      return await handleApiResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchList = createAsyncThunk(
  "cryptoList/fetchList",
  async (ids, { rejectWithValue }) => {
    try {
      const { url, headers } = buildApiConfig(`assets`, `ids=${ids}`);

      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers
      });

      return await handleApiResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
