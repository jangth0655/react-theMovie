import Details from "./slices/Detail.Slice";
import popularSlice from "./slices/PopularSlice";
import IsLoginSlice from "./slices/IsLoginSlice";
import VideoSlice from "./slices/VideoSlice";
import RecommendationSlice from "./slices/RecommendationSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  popularSlice,
  IsLoginSlice,
  Details,
  VideoSlice,
  RecommendationSlice,
});

export default reducer;
