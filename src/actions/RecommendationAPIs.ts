import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_NAME } from "./apis";
import { IPopularMovies, IPopularTVs } from "./PopularAPIs";

//movie
export const movieRecommendation = createAsyncThunk(
  "movie/recommendation",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get<IPopularMovies>(
        `${BASE_NAME}/movie/${id}/recommendations?api_key=${API_KEY}&language=ko&page=1`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error} 에러가 발생하였습니다.`);
    }
  }
);

//tv
export const TvRecommendation = createAsyncThunk(
  "tv/recommendation",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get<IPopularTVs>(
        `${BASE_NAME}/tv/${id}/recommendations?api_key=${API_KEY}&language=ko&page=1`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error} 에러가 발생하였습니다.`);
    }
  }
);
