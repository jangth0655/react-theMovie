import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getPopularMovies,
  IPopularMovies,
  IPopularMoviesResults,
} from "../actions/PopularMovies";

const initialState = {
  movieData: [] as IPopularMoviesResults[],
  tvData: [],
  loadingState: true,
};

export const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
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
  },
});

export default popularSlice.reducer;
