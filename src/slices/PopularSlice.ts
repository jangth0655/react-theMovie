import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getPopularMovies,
  getPopularTV,
  IPopularMovies,
  IPopularMoviesResults,
  IPopularTVResults,
  IPopularTVs,
} from "../actions/PopularMovies";

const initialState = {
  movieData: [] as IPopularMoviesResults[],
  tvData: [] as IPopularTVResults[],
  loadingState: true,
};

export const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //movie
    builder.addCase(
      getPopularMovies.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      getPopularMovies.fulfilled,
      (state, action: PayloadAction<IPopularMovies>) => {
        state.movieData = [...action.payload.results];
        state.loadingState = false;
      }
    );
    builder.addCase(getPopularMovies.rejected, (state, action) => {});
    // tv
    builder.addCase(
      getPopularTV.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      getPopularTV.fulfilled,
      (state, action: PayloadAction<IPopularTVs>) => {
        state.tvData = action.payload.results;
        state.loadingState = false;
      }
    );
    builder.addCase(getPopularTV.rejected, (state, action) => {});
  },
});

export default popularSlice.reducer;
