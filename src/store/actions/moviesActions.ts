import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRequests } from '../../service/verb';
import {
  MOVIE_URL,
  POPULER_MOVIES_URL,
  TOP_RATED_URL,
} from '../../service/urls';

const getTopRatedMovies = createAsyncThunk(
  'movies/getTopRatedMovies',
  async () => {
    const response = await getRequests(TOP_RATED_URL, {});
    return response.data;
  },
);

const getPopularMovies = createAsyncThunk(
  'movies/getPopularMovies',
  async () => {
    const response = await getRequests(POPULER_MOVIES_URL, {});
    return response.data;
  },
);

const getMovieDetail = createAsyncThunk('movies/getMovieDetail', async id => {
  const response = await getRequests(`${MOVIE_URL}/${id}`, {});
  return response.data;
});

export { getTopRatedMovies, getPopularMovies, getMovieDetail };
