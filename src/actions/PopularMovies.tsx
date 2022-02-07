import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_NAME } from "./apis";

export interface IPopularMoviesResults {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
}

export interface IPopularMovies {
  page: number;
  results: IPopularMoviesResults[];
  total_pages: number;
  total_results: number;
}

export const getPopularMovies = createAsyncThunk(
  "movies/popular",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IPopularMovies>(
        `${BASE_NAME}/movie/popular?api_key=${API_KEY}&language=kr&page=1`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`(${error})에러가 발생했습니다.`);
    }
  }
);
