import popularSlice from "./slices/PopularSlice";
import IsLoginSlice from "./slices/IsLoginSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  popularSlice,
  IsLoginSlice,
});

export default reducer;
