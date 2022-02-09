import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getMovieVideo,
  getTvVideo,
  IGetVideoResults,
  IGetVideos,
} from "../actions/Video";

const initialState = {
  videoData: [] as IGetVideoResults[],
  tvData: [] as IGetVideoResults[],
  loadingState: true,
};

const VideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMovieVideo.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      getMovieVideo.fulfilled,
      (state, action: PayloadAction<IGetVideos>) => {
        state.videoData = [...action.payload.results];
        state.loadingState = false;
      }
    );
    builder.addCase(getMovieVideo.rejected, (state, action) => {});
    //tv
    builder.addCase(
      getTvVideo.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      getTvVideo.fulfilled,
      (state, action: PayloadAction<IGetVideos>) => {
        state.tvData = [...action.payload.results];
        state.loadingState = false;
      }
    );
    builder.addCase(getTvVideo.rejected, (state, action) => {});
  },
});

export default VideoSlice.reducer;
