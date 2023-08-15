import api from "./api";
import {
  START_REQUEST,
  HIT_REQUEST,
  STAND_REQUEST,
  API_FAILURE,
  dispatchBlackjack,
} from "./actions/blackjack";

export const startGame = (username) => async (dispatch) => {
  try {
    const response = await api.post("/start", { username });
    console.log("response:>>", response.data);
    await dispatch(dispatchBlackjack({ type: START_REQUEST, payload: response.data }));
  } catch (error) {
    console.log("error:>>", error);
    await dispatch(dispatchBlackjack({ type: API_FAILURE, payload: error.message }));
  }
};

export const hit = (username) => async (dispatch) => {
  try {
    console.log("response:>>", username);
    const response = await api.post("/hit", { username });
    await dispatch(dispatchBlackjack({ type: HIT_REQUEST, payload: response.data }));
  } catch (error) {
    await dispatch(dispatchBlackjack({ type: API_FAILURE, payload: error.message }));
  }
};

export const stand = (username) => async (dispatch) => {
  try {
    const response = await api.post("/stand", { username });
    await dispatch(dispatchBlackjack({ type: STAND_REQUEST, payload: response.data }));
  } catch (error) {
    await dispatch(dispatchBlackjack({ type: API_FAILURE, payload: error.message }));
  }
};
