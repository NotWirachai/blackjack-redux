import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';

// Actions
const START_REQUEST = 'START_REQUEST';
const HIT_REQUEST = 'HIT_REQUEST';
const STAND_REQUEST = 'STAND_REQUEST';
const API_SUCCESS = 'API_SUCCESS';
const API_FAILURE = 'API_FAILURE';

// Action Creators
export const startRequest = (username) => {
  localStorage.setItem('username', username);
  return { type: START_REQUEST, username };
};
export const hitRequest = (username) => ({ type: HIT_REQUEST, username });
export const standRequest = (username) => ({ type: STAND_REQUEST, username });
export const apiSuccess = (data) => ({ type: API_SUCCESS, data });
export const apiFailure = (error) => ({ type: API_FAILURE, error });

// Reducer
const initialState = {
    dealer: { },
    player: { },
    result: "None",
    error: null,
    username: " ",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case API_SUCCESS:
        return {
          ...state,
          dealer: action.data.dealer,
          player: action.data.player,
          result: action.data.result,
          error: null,
        };
      case API_FAILURE:
        return { ...state, error: action.error };
      default:
        return state;
    }
  };

// API Calls
const baseUrl = 'http://localhost:3001/api';

const api = {
  start: (username) => axios.post(`${baseUrl}/start`, { username }),
  hit: (username) => axios.post(`${baseUrl}/hit`, { username }),
  stand: (username) => axios.post(`${baseUrl}/stand`, { username }),
};

// Sagas
function* startSaga(action) {
    try {
      const response = yield call(api.start, action.username);
      yield put(apiSuccess(response.data));
    } catch (error) {
      yield put(apiFailure(error.message));
    }
  }
  
  function* hitSaga(action) {
    try {
      const response = yield call(api.hit, action.username);
      yield put(apiSuccess(response.data));
    } catch (error) {
      yield put(apiFailure(error.message));
    }
  }
  
  function* standSaga(action) {
    try {
      const response = yield call(api.stand, action.username);
      yield put(apiSuccess(response.data));
    } catch (error) {
      yield put(apiFailure(error.message));
    }
  }
  
  function* watchRequests() {
    yield takeEvery(START_REQUEST, startSaga);
    yield takeEvery(HIT_REQUEST, hitSaga);
    yield takeEvery(STAND_REQUEST, standSaga);
  }

// Root Saga
export function* rootSaga() {
  yield all([watchRequests()]);
}

export default reducer;
