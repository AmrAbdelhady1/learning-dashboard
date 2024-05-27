import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { PreferenceReducer } from "./reducers";

const store = configureStore({
  reducer: {
    PreferenceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
