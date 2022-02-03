import popularSlice from "./slices/PopularSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  popularSlice,
});

export default reducer;
