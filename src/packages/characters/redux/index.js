import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchPage } from "./rickandmortyAPI";

export const STATE = {
  LOADING: "loading",
  IDLE: "idle",
  ERROR: "error",
};

const initialState = {
  data: null,
  error: null,
  status: STATE.IDLE,
  info: null,
};

export const fetchByPage = createAsyncThunk(
  "characters/fetchByPageStatus",
  async (page) => {
    const response = await fetchPage(page);
    console.log("response: ", response);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByPage.pending, (state) => {
        state.error = null;
        state.status = STATE.LOADING;
      })
      .addCase(fetchByPage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data = action.payload.results;
        state.error = null;
        state.info = action.payload.info;
        state.status = STATE.IDLE;
      })
      .addCase(fetchByPage.rejected, (state, action) => {
        state.data = null;
        state.error = action.error;
        state.info = null;
        state.status = STATE.ERROR;
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  charactersSlice.actions;

export const selectCharacters = (state) => state.characters;

export default charactersSlice.reducer;
