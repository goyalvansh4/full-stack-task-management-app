// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GlobalAxios from "../../Global/GlobalAxios";

// Async thunk to handle login
export const login = createAsyncThunk("/login", async (credentials) => {
  const response = await GlobalAxios.post("/login", credentials);
  return response.data;  // e.g., { user, token }
});

// Async thunk to handle logout
export const logout = createAsyncThunk("user/logout", async () => {
  await GlobalAxios.post("/logout");
  return null; // Just a simple action on logout
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
      });
  }
});

export default userSlice.reducer;
