import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_NAME } from "./apis";

//Popular movies
export interface IPopularMoviesResults {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

export interface IPopularMovies {
  page: number;
  results: IPopularMoviesResults[];
  total_pages: number;
  total_results: number;
}

//popularTV
export interface IPopularTVResults {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
}

export interface IPopularTVs {
  page: number;
  results: IPopularTVResults[];
  total_pages: number;
  total_results: number;
}

//tv thunk
export const getPopularTV = createAsyncThunk(
  "tv/popular",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IPopularTVs>(
        `${BASE_NAME}/tv/popular?api_key=${API_KEY}&language=ko&page=1`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`(${error})에러가 발생했습니다.`);
    }
  }
);

//movie thunk
export const getPopularMovies = createAsyncThunk(
  "movies/popular",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IPopularMovies>(
        `${BASE_NAME}/movie/popular?api_key=${API_KEY}&language=ko&page=1`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(`(${error})에러가 발생했습니다.`);
    }
  }
);
