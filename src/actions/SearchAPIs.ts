import { API_KEY, BASE_NAME } from "./apis";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ISearchResults {
  id: number;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  title: string;
  release_date: string;
}

export interface ISearch {
  page: number;
  results: ISearchResults[];
  total_pages: number;
  total_results: number;
}

export const SearchAPIs = createAsyncThunk(
  "search/all",
  async (query: string, thunkAPI) => {
    try {
      const response = await axios.get<ISearch>(
        `${BASE_NAME}/search/multi?api_key=${API_KEY}&language=ko&query=${query}&page=1`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error} 에러가 발생했습니다.`);
    }
  }
);
