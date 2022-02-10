import { BASE_NAME, API_KEY } from "./apis";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const movieUpComing = createAsyncThunk(
  "movies/upcoming",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_NAME}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}에러가 발생했습니다.`);
    }
  }
);
