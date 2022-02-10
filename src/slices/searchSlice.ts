import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearch, ISearchResults, SearchAPIs } from "../actions/SearchAPIs";

const initialState = {
  data: [] as ISearchResults[],
  loadingState: false,
};

export const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      SearchAPIs.pending,
      (state, action: PayloadAction<void>) => {
        state.loadingState = true;
      }
    );
    builder.addCase(
      SearchAPIs.fulfilled,
      (state, action: PayloadAction<ISearch>) => {
        state.data = [...action.payload.results];
        state.loadingState = false;
      }
    );
    builder.addCase(SearchAPIs.rejected, (state, action) => {});
  },
});

export default SearchSlice.reducer;
