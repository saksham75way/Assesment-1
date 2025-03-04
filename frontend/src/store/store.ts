import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import fundingReducer from "./reducers/fundingReducer";
import paymentReducer from "./reducers/paymentReducer";
import { api } from "../services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    funding: fundingReducer,
    payment: paymentReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
