import {
    UPDATE_BET,
    UPDATE_PLAYER_BALANCE
  } from "../actions/bet";
  
  const initialState = {
    bet: 0,
    playerBalance: 1000,
  };
  
  const bet = (state = initialState, action) => {
    // console.log("action:>>", action);
    switch (action.type) {
      case UPDATE_BET:
        return { ...state, bet: action.payload };
      case UPDATE_PLAYER_BALANCE:
        return { ...state, playerBalance: action.payload };

      default:
        return state;
    }
  };
  
  export default bet;
  