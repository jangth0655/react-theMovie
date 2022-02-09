import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPopularMovies,
  IPopularMoviesResults,
  IPopularTVResults,
  IPopularTVs,
} from "../actions/PopularAPIs";
import {
  movieRecommendation,
  TvRecommendation,
} from "../actions/RecommendationAPIs";

const initialState = {
  movieData: [] as IPopularMoviesResults[],
  tvData: [] as IPopularTVResults[],
  loadingState: true,
};

export const RecommendationSlice = createSlice({
  name: "Recommendation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //movie
    builder.addCase(
      movieRecommendation.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      movieRecommendation.fulfilled,
      (state, action: PayloadAction<IPopularMovies>) => {
        state.movieData = [...action.payload.results];
        state.loadingState = false;
      }
    );
    builder.addCase(movieRecommendation.rejected, (state, action) => {});

    //tv
    builder.addCase(
      TvRecommendation.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      TvRecommendation.fulfilled,
      (state, action: PayloadAction<IPopularTVs>) => {
        state.tvData = [...action.payload.results];
        state.loadingState = false;
      }
    );
    builder.addCase(TvRecommendation.rejected, (state, action) => {});
  },
});

export default RecommendationSlice.reducer;
