import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};

const DarkModeSlice = createSlice({
  name: "dark-mode",
  initialState,
  reducers: {
    isDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = true;
    },
    isLight: (state, action: PayloadAction<boolean>) => {
      state.isDark = false;
    },
  },
});

export const { isDark, isLight } = DarkModeSlice.actions;
export default DarkModeSlice.reducer;
