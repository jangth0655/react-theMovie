import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ActorAPIs,
  IActors,
  IActorsResults,
} from "../actions/ActorPopularAPIs";

interface IError {
  message: string;
}

const initialState = {
  actorData: [] as IActorsResults[],
  loadingState: true,
  error: {} as IError,
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
    builder.addCase(ActorAPIs.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loadingState = true;
    });
  },
});

export default ActorSlice.reducer;
