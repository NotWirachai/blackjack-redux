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
import { getBlackjack } from "./selectors";

function* startSaga() {
  const Blackjack = yield select(getBlackjack);
  const { username } = Blackjack;
  try {
    const response = yield call(blackjackProvider.startGame(username));
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

function* hitSaga() {
  const Blackjack = yield select(getBlackjack);
  const { username } = Blackjack;
  try {
    const response = yield call(blackjackProvider.hit(username));
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

function* standSaga() {
  const Blackjack = yield select(getBlackjack);
  const { username } = Blackjack;
  try {
    const response = yield call(blackjackProvider.stand(username));
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
