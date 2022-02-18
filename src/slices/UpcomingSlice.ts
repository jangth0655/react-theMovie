import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPopularMovies, IPopularMoviesResults } from "../actions/PopularAPIs";
import { movieUpComing } from "../actions/UpcomingAPIs";

const initialState = {
  movieData: [] as IPopularMoviesResults[],
  loadingState: true,
};

export const UpcomingSlice = createSlice({
  name: "upcoming",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //movie
    builder.addCase(
      movieUpComing.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      movieUpComing.fulfilled,
      (state, action: PayloadAction<IPopularMovies>) => {
        state.movieData = [...action.payload.results];
        state.loadingState = false;
      }
    );
    builder.addCase(movieUpComing.rejected, (state, action) => {
      state.loadingState = true;
    });
  },
});

export default UpcomingSlice.reducer;
