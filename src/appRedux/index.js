import { configureStore } from "@reduxjs/toolkit";

import charactersReducer from "../packages/characters/redux";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});
