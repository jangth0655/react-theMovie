import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieNowPlaying, tvNowPlaying } from "../actions/NowplayingAPIs";
import {
  IPopularMovies,
  IPopularMoviesResults,
  IPopularTVResults,
  IPopularTVs,
} from "../actions/PopularAPIs";

const initialState = {
  movieData: [] as IPopularMoviesResults[],
  tvData: [] as IPopularTVResults[],
  loadingState: true,
};

export const NowPlayingSlice = createSlice({
  name: "nowPlaying",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //movie
    builder.addCase(
      movieNowPlaying.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      movieNowPlaying.fulfilled,
      (state, action: PayloadAction<IPopularMovies>) => {
        state.loadingState = false;
        state.movieData = [...action.payload.results];
      }
    );
    builder.addCase(movieNowPlaying.rejected, (state, action) => {
      state.loadingState = true;
    });

    //tv
    builder.addCase(
      tvNowPlaying.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      tvNowPlaying.fulfilled,
      (state, action: PayloadAction<IPopularTVs>) => {
        state.loadingState = false;
        state.tvData = [...action.payload.results];
      }
    );
    builder.addCase(tvNowPlaying.rejected, (state, action) => {});
  },
});

export default NowPlayingSlice.reducer;
