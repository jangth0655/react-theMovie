import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MovieDeTailPagesAPI,
  IMovieDetails,
  ITvDetails,
  TvDetailPagesAPI,
} from "../actions/DetailPage";

const initialState = {
  MovieDetails: {} as IMovieDetails,
  TvDetails: {} as ITvDetails,
  loadingState: true,
};

export const Details = createSlice({
  name: "Detail page",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //movie
    builder.addCase(
      MovieDeTailPagesAPI.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      MovieDeTailPagesAPI.fulfilled,
      (state, action: PayloadAction<IMovieDetails>) => {
        state.MovieDetails = action.payload;
        state.loadingState = false;
      }
    );
    builder.addCase(MovieDeTailPagesAPI.rejected, (state, action) => {});
    // tv
    builder.addCase(
      TvDetailPagesAPI.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      TvDetailPagesAPI.fulfilled,
      (state, action: PayloadAction<ITvDetails>) => {
        state.TvDetails = action.payload;
        state.loadingState = false;
      }
    );
    builder.addCase(TvDetailPagesAPI.rejected, (state, action) => {
      state.loadingState = true;
    });
  },
});

export default Details.reducer;
