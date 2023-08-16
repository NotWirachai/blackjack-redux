import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  START_REQUEST,
  HIT_REQUEST,
  STAND_REQUEST,
  API_FAILURE,
  API_SUCCESS,
  dispatchBlackjack,
} from "../actions/blackjack";
import blackjackProvider from "../../provider/blackjackProvider";

// const playerBalance = (state) => state.bet.playerBalance;

function* startSaga(action) {
//   const balance = yield select(playerBalance);
//   console.log("actionSaga:>>", balance);
  try {
    const response = yield call(blackjackProvider.startGame, action.payload);
    yield put(
      dispatchBlackjack({
        type: API_SUCCESS,
        payload: response.data,
      })
    );
  } catch (error) {
    yield put(
      dispatchBlackjack({
        type: API_FAILURE,
        payload: error.message,
      })
    );
  }
}

function* hitSaga(action) {
  try {
    const response = yield call(blackjackProvider.hit, action.payload);
    yield put(
      dispatchBlackjack({
        type: API_SUCCESS,
        payload: response.data,
      })
    );
  } catch (error) {
    yield put(
      dispatchBlackjack({
        type: API_FAILURE,
        payload: error.message,
      })
    );
  }
}

function* standSaga(action) {
  try {
    const response = yield call(blackjackProvider.stand, action.payload);
    yield put(
      dispatchBlackjack({
        type: API_SUCCESS,
        payload: response.data,
      })
    );
  } catch (error) {
    yield put(
      dispatchBlackjack({
        type: API_FAILURE,
        payload: error.message,
      })
    );
  }
}

export default function* blackjack() {
  yield takeEvery(START_REQUEST, startSaga);
  yield takeEvery(HIT_REQUEST, hitSaga);
  yield takeEvery(STAND_REQUEST, standSaga);
}
