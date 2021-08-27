import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MoviesApi } from '../../../api';

const prefix = 'netflix/movie';

const GET_UPCOMING_MOVIE_START = `${prefix}/GET_UPCOMING_MOVIE_START`;
const GET_UPCOMING_MOVIE_SUCCESS = `${prefix}/GET_UPCOMING_MOVIE_SUCCESS`;
const GET_UPCOMING_MOVIE_FAIL = `${prefix}/GET_UPCOMING_MOVIE_FAIL`;

export const getUpcomingMovieStart = () => {
  return {
    type: GET_UPCOMING_MOVIE_START,
  };
};

export const getUpcomingMovieSuccess = (data: any) => {
  return {
    type: GET_UPCOMING_MOVIE_SUCCESS,
    payload: data,
  };
};

export const getUpcomingMovieFail = (error: any) => {
  return {
    type: GET_UPCOMING_MOVIE_FAIL,
    payload: error,
  };
};

interface movieState {
  data: Array<any>;
  loading: boolean;
  error: any;
}

const initialState: movieState = {
  data: [],
  loading: true,
  error: null,
};

const reducer = handleActions<movieState, any>(
  {
    [GET_UPCOMING_MOVIE_START]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [GET_UPCOMING_MOVIE_SUCCESS]: (state, action) => ({
      data: action.payload,
      loading: false,
      error: null,
    }),
    [GET_UPCOMING_MOVIE_FAIL]: (state, action) => ({ data: [], loading: false, error: action.payload }),
  },
  initialState
);

export default reducer;

//saga

export function* getUpcomingMovieSaga() {
  try {
    const response: AxiosResponse<any> = yield call(MoviesApi.upcoming);
    yield put(getUpcomingMovieSuccess(response.data.results));
  } catch (error) {
    yield put(getUpcomingMovieFail(error));
  }
}

export function* getUpcomingMovieSagas() {
  yield takeLatest(GET_UPCOMING_MOVIE_START, getUpcomingMovieSaga);
}
