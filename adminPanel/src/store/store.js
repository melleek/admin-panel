import { configureStore } from "@reduxjs/toolkit";
import Reducer from "../reducers/Reducer";

export const store = configureStore({
  reducer: {
    Reducer,
  },
});
