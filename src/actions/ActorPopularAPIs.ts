import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_NAME } from "./apis";

interface knownFor {
  backdrop_path: string;
  poster_path: string;
  title: string;
  id: number;
}

export interface IActorsResults {
  id: number;
  name: string;
  profile_path: string;
  known_for: knownFor[];
}

export interface IActors {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}

export const ActorAPIs = createAsyncThunk("data/actor", async (_, thunkAPI) => {
  try {
    const response = await axios.get<IActors>(
      `${BASE_NAME}/person/popular?api_key=${API_KEY}&language=ko&page=1`
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
