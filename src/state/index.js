import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "api";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const initialState = {
  mode: "light",
  accessToken: accessToken ? accessToken : null,
  isLoggedIn: false,
};

export const login = createAsyncThunk(
  "api/auth/staff",
  async (data, { rejectWithValue }) => {
    const response = await fetch(`${baseURL}/api/auth/staff`, {
      // const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }
    axios.default.header = { Authorziration: "Bearer " + jsonData.accessToken };
    console.log(axios.default.header);
    return jsonData;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await localStorage.removeItem("accessToken");
});

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducer: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
  extraReducers: (builder) => {
    // Start login request
    builder.addCase(login.pending, (state) => {
      state.isLoggedIn = true;
    });

    // Request successful
    builder.addCase(login.fulfilled, (state, { payload: data }) => {
      state.isLoggedIn = false;
      state.accessToken = data.accessToken;
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    });

    // Request error
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
    });

    // Request successful
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
    });
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
