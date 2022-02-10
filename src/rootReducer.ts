import Details from "./slices/Detail.Slice";
import popularSlice from "./slices/PopularSlice";
import IsLoginSlice from "./slices/IsLoginSlice";
import VideoSlice from "./slices/VideoSlice";
import RecommendationSlice from "./slices/RecommendationSlice";
import NowPlayingSlice from "./slices/NowPlayingSlice";
import UpcomingSlice from "./slices/UpcomingSlice";
import AiringTodaySlice from "./slices/AiringTodaySlice";
import ActorSlice from "./slices/ActorSlice";
import searchSlice from "./slices/searchSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  popularSlice,
  IsLoginSlice,
  Details,
  VideoSlice,
  RecommendationSlice,
  NowPlayingSlice,
  UpcomingSlice,
  AiringTodaySlice,
  ActorSlice,
  searchSlice,
});

export default reducer;
