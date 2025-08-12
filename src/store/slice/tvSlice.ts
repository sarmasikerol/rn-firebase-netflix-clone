import { createSlice } from '@reduxjs/toolkit';
import { getPopularTv, getTopRatedTv, getTvDetail } from '../actions/tvActions';
import { TvTypes } from '../../model/data/tvTypes';

const initialState: TvTypes = {
  pending: false,
  topRatedTv: [],
  popularTv: [],
  tvDetailData: {},
};

const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTopRatedTv.pending, state => {
        state.pending = true;
      })
      .addCase(getTopRatedTv.fulfilled, (state, action: any) => {
        state.topRatedTv = action.payload.results;
      })
      .addCase(getTopRatedTv.rejected, (state, action: any) => {})
      .addCase(getPopularTv.pending, state => {
        state.pending = true;
      })
      .addCase(getPopularTv.fulfilled, (state, action: any) => {
        state.popularTv = action.payload.results;
      })
      .addCase(getPopularTv.rejected, (state, action: any) => {})
      .addCase(getTvDetail.pending, state => {
        state.pending = true;
      })
      .addCase(getTvDetail.fulfilled, (state, action: any) => {
        state.tvDetailData = action.payload.results;
      })
      .addCase(getTvDetail.rejected, (state, action: any) => {});
  },
});

export default tvSlice.reducer;
