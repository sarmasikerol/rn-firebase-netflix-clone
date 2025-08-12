import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MoviesTypes } from '../../model/data/moviesTypes';
import {
  getMovieDetail,
  getPopularMovies,
  getTopRatedMovies,
} from '../actions/moviesActions';

const initialState: MoviesTypes = {
  pending: false,
  topRatedMovies: [],
  popularMovies: [],
  movieDetail: null, // movieDetailData yerine movieDetail
  error: null, // error field'ı eksikti
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTopRatedMovies.pending, state => {
        state.pending = true;
      })
      .addCase(
        getTopRatedMovies.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.pending = false;
          state.topRatedMovies = action.payload.results;
        },
      )
      .addCase(getTopRatedMovies.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message || 'Bir hata oluştu';
      })
      .addCase(getPopularMovies.pending, state => {
        state.pending = true;
      })
      .addCase(
        getPopularMovies.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.pending = false;
          state.popularMovies = action.payload.results;
        },
      )
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message || 'Bir hata oluştu';
      })
      .addCase(getMovieDetail.pending, state => {
        state.pending = true;
      })
      .addCase(getMovieDetail.fulfilled, (state, action: PayloadAction<any>) => {
        state.pending = false;
        // Film detayı direkt obje olarak gelir, results array'i değil
        state.movieDetail = action.payload;
      })
      .addCase(getMovieDetail.rejected, (state, action) => {
        state.pending = false;
        state.movieDetail = null;
        state.error = action.error.message || 'Bir hata oluştu';
      });
  },
});

export default moviesSlice.reducer;