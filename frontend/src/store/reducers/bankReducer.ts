import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";

// Define a type for the bank object
interface Bank {
  id: string;
  name: string;
  accountNumber: string;
  branch: string;
}

// Define a type for the slice state
interface BankState {
  banks: Bank[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: BankState = {
  banks: [],
  loading: false,
  error: null,
};

export const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setBanks: (state, action: PayloadAction<Bank[]>) => {
      state.banks = action.payload;
      state.loading = false;
      state.error = null;
    },
    addBank: (state, action: PayloadAction<Bank>) => {
      state.banks.push(action.payload);
    },
    updateBank: (state, action: PayloadAction<Bank>) => {
      state.banks = state.banks.map((bank) =>
        bank.id === action.payload.id ? action.payload : bank
      );
    },
    deleteBank: (state, action: PayloadAction<string>) => {
      state.banks = state.banks.filter((bank) => bank.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getAllBanks.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(api.endpoints.getAllBanks.matchRejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setLoading,
  setError,
  setBanks,
  addBank,
  updateBank,
  deleteBank,
} = bankSlice.actions;
export default bankSlice.reducer;
