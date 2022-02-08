import Details from "./slices/Detail.Slice";
import popularSlice from "./slices/PopularSlice";
import IsLoginSlice from "./slices/IsLoginSlice";
import VideoSlice from "./slices/VideoSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  popularSlice,
  IsLoginSlice,
  Details,
  VideoSlice,
});

export default reducer;
