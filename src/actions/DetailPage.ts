import { API_KEY, BASE_NAME } from "./apis";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//movie details
interface IGenres {
  id: number;
  name: string;
}

export interface IMovieDetails {
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  genres: IGenres[] | null;
  id: number;
  original_title: string;
  revenue: number;
  budget: number;
  runtime: number;
  release_date: string;
  overview: string;
}

export const MovieDeTailPagesAPI = createAsyncThunk(
  "data/movieDetails",
  async (id: number, thunkAPI) => {
    try {
      return await axios
        .get<IMovieDetails>(
          `${BASE_NAME}/movie/${id}?api_key=${API_KEY}&language=ko`
        )
        .then((res) => res.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//TV details

export interface ITvDetails {
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  last_air_date: string;
  original_name: string;
  genres: IGenres[];
  id: number;
  number_of_episodes: number;
  vote_average: number;
  overview: string;
  episode_run_time: number[];
}

export const TvDetailPagesAPI = createAsyncThunk(
  "data/tvDetail",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get<ITvDetails>(
        `${BASE_NAME}/tv/${id}?api_key=${API_KEY}&language=ko`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error} 에러가 발생했습니다.`);
    }
  }
);
