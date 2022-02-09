import { BASE_NAME, API_KEY } from "./apis";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IGetVideoResults {
  id: string;
  name: string;
  key: string;
}

export interface IGetVideos {
  id: number;
  results: IGetVideoResults[];
}

// movie

export const getMovieVideo = createAsyncThunk(
  "movie/video",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_NAME}/movie/${id}/videos?api_key=${API_KEY}&language=ko`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//tv

export const getTvVideo = createAsyncThunk(
  "tv/video",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get<IGetVideos>(
        `${BASE_NAME}/tv/${id}/videos?api_key=${API_KEY}&language=ko`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
