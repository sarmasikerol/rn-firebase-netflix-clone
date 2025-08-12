import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRequests } from '../../service/verb';
import { POPULER_TV_URL, TOP_RATED_TV_URL, TV_URL } from '../../service/urls';

const getTopRatedTv = createAsyncThunk('Tv/getTopRatedTv', async () => {
  const response = await getRequests(TOP_RATED_TV_URL, {});
  return response.data;
});

const getPopularTv = createAsyncThunk('Tv/getPopularTv', async () => {
  const response = await getRequests(POPULER_TV_URL, {});
  return response.data;
});

const getTvDetail = createAsyncThunk('movies/getTvDetail', async id => {
  const response = await getRequests(`${TV_URL}/${id}`, {});
  return response.data;
});

export { getTopRatedTv, getPopularTv, getTvDetail };
