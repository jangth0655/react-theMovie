import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ActorAPIs,
  IActors,
  IActorsResults,
} from "../actions/ActorPopularAPIs";

const initialState = {
  actorData: [] as IActorsResults[],
  loadingState: true,
};

export const ActorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ActorAPIs.pending, (state, action: PayloadAction<void>) => {
      state.loadingState = true;
    });
    builder.addCase(
      ActorAPIs.fulfilled,
      (state, action: PayloadAction<IActors>) => {
        state.actorData = [...action.payload.results];
        state.loadingState = false;
      }
    );
    builder.addCase(ActorAPIs.rejected, (state, action) => {});
  },
});

export default ActorSlice.reducer;
