import { createSlice } from "@reduxjs/toolkit";

interface IPopularMovie {
  // data...
}

const initialState = {
  // data
  // isLoading
};

export const popularSlice = createSlice({
  name: "popularMovies",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default popularSlice.reducer;
