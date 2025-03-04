import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { IPayment } from "../../types";

interface PaymentState {
  payments: IPayment[];
  loading: boolean;
}

const initialState: PaymentState = {
  payments: [],
  loading: false,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPayments: (state, action: PayloadAction<IPayment[]>) => {
      state.payments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getAllPayments.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        api.endpoints.getAllPayments.matchFulfilled,
        (state, action) => {
          state.payments = action.payload.data;
          state.loading = false;
        }
      )
      .addMatcher(api.endpoints.getAllPayments.matchRejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, setPayments } = paymentSlice.actions;
export default paymentSlice.reducer;
