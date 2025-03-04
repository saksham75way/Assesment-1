import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { IFunding } from "../../types";

interface FundingState {
  fundings: IFunding[];
  loading: boolean;
}

const initialState: FundingState = {
  fundings: [],
  loading: false,
};

export const fundingSlice = createSlice({
  name: "funding",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFundings: (state, action: PayloadAction<IFunding[]>) => {
      state.fundings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getAllFunding.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        api.endpoints.getAllFunding.matchFulfilled,
        (state, action) => {
          state.fundings = action.payload.data;
          state.loading = false;
        }
      )
      .addMatcher(api.endpoints.getAllFunding.matchRejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, setFundings } = fundingSlice.actions;
export default fundingSlice.reducer;
