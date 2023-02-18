import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "api";
import axios from "axios";

const profile = localStorage.getItem("profile");

const initialState = {
  mode: "light",
  profile: profile ? profile : null,
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
    axios.default.header = {Authorziration: "Bearer " + jsonData.serviceToken}
    // axios.default.header = {Authorziration: "Bearer " + jsonData.accessToken}
    console.log(axios.default.header);
    return jsonData;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await localStorage.removeItem("profile");;
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
    builder.addCase(login.fulfilled, (state, { payload: profile }) => {
      state.isLoggedIn = false;
      state.profile = profile.profile;
      localStorage.setItem("profile", JSON.stringify(profile.profile));
    });

    // Request error
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
    });

    // Request successful
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.profile = null;
    });
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
