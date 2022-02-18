import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AiringTodayAPIs } from "../actions/AiringTodayAPIs";

import { IPopularTVResults, IPopularTVs } from "../actions/PopularAPIs";

const initialState = {
  tvData: [] as IPopularTVResults[],
  loadingState: true,
};

export const AiringTodaySlice = createSlice({
  name: "nowPlaying",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //tv
    builder.addCase(
      AiringTodayAPIs.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      AiringTodayAPIs.fulfilled,
      (state, action: PayloadAction<IPopularTVs>) => {
        state.loadingState = false;
        state.tvData = [...action.payload.results];
      }
    );
    builder.addCase(AiringTodayAPIs.rejected, (state, action) => {
      state.loadingState = true;
    });
  },
});

export default AiringTodaySlice.reducer;
