import {
  START_REQUEST,
  HIT_REQUEST,
  STAND_REQUEST,
  API_FAILURE
} from "../actions/blackjack";

const initialState = {
  dealer: {},
  player: {},
  result: "",
  error: null
};

const blackjack = (state = initialState, action) => {
  // console.log("action:>>", action);
  switch (action.type) {
    case START_REQUEST:
    case HIT_REQUEST:
    case STAND_REQUEST:
      return {
        ...state,
        dealer: action.payload.dealer,
        player: action.payload.player,
        result: action.payload.result,
        error: null,
      };
    case API_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default blackjack;
