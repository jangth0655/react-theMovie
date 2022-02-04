import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

export const isLoginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    isLogging: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    isLogout: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { isLogging, isLogout } = isLoginSlice.actions;
export default isLoginSlice.reducer;
