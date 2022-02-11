import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchCharacter,
  fetchCharacterEpisodes,
  fetchPage,
} from "./rickandmortyAPI";

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
    return response;
  }
);

export const fetchById = createAsyncThunk(
  "characters/fetchByIdStatus",
  async (id) => {
    const character = await fetchCharacter(id);
    const episodes = await fetchCharacterEpisodes(character.episode);

    const itsArray = !!(episodes?.length >= 0);

    if (itsArray) {
      character.episodes = episodes;
    } else {
      character.episodes = [episodes];
    }
    return character;
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
      })
      .addCase(fetchById.pending, (state) => {
        state.error = null;
        state.status = STATE.LOADING;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.info = null;
        state.status = STATE.IDLE;
      })
      .addCase(fetchById.rejected, (state, action) => {
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
