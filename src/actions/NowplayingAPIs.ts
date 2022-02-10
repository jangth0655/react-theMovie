import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_NAME } from "./apis";

//movie
export const movieNowPlaying = createAsyncThunk(
  "movies/nowPlaying",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_NAME}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
      );
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(`${error}에러가 발생했습니다.`);
    }
  }
);

//tv
export const tvNowPlaying = createAsyncThunk(
  "tv/nowPlaying",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_NAME}/tv/on_the_air?api_key=${API_KEY}&language=ko&page=1`
      );
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(`${error}에러가 발생했습니다.`);
    }
  }
);
