import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import charactersReducer from "../packages/characters/redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    characters: charactersReducer,
  },
});
