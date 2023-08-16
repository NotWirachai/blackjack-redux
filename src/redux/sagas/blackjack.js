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

// function* startSaga(action) {
//   try {
//     const response = yield call(blackjackProvider.startGame, action.payload);
//     yield put(
//       dispatchBlackjack({
//         type: API_SUCCESS,
//         payload: response.data,
//       })
//     );
//   } catch (error) {
//     yield put(
//       dispatchBlackjack({
//         type: API_FAILURE,
//         payload: error.message,
//       })
//     );
//   }
// }

// function* hitSaga(action) {
//   try {
//     const response = yield call(blackjackProvider.hit, action.payload);
//     yield put(
//       dispatchBlackjack({
//         type: API_SUCCESS,
//         payload: response.data,
//       })
//     );
//   } catch (error) {
//     yield put(
//       dispatchBlackjack({
//         type: API_FAILURE,
//         payload: error.message,
//       })
//     );
//   }
// }

// function* standSaga(action) {
//   try {
//     const response = yield call(blackjackProvider.stand, action.payload);
//     yield put(
//       dispatchBlackjack({
//         type: API_SUCCESS,
//         payload: response.data,
//       })
//     );
//   } catch (error) {
//     yield put(
//       dispatchBlackjack({
//         type: API_FAILURE,
//         payload: error.message,
//       })
//     );
//   }
// }

// export default function* blackjack() {
//   yield takeEvery(START_REQUEST, startSaga);
//   yield takeEvery(HIT_REQUEST, hitSaga);
//   yield takeEvery(STAND_REQUEST, standSaga);
// }

const username = (state) => state.blackjack.username;

function* startSaga() {
  const usernameselect = yield select(username);
  try {
    const response = yield call(blackjackProvider.startGame, usernameselect);
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
  const usernameselect = yield select(username);
  try {
    const response = yield call(blackjackProvider.hit, usernameselect);
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
  const usernameselect = yield select(username);
  try {
    const response = yield call(blackjackProvider.stand, usernameselect);
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
