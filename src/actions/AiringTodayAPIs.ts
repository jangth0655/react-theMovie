import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_NAME } from "./apis";

//tv
export const AiringTodayAPIs = createAsyncThunk(
  "tv/airingLatest",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_NAME}/tv/airing_today?api_key=${API_KEY}&language=ko&page=1`
      );
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(`${error}에러가 발생했습니다.`);
    }
  }
);
