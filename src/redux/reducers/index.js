import { combineReducers } from 'redux';
import blackjack from './blackjack'; 
import bets from './bets'

const rootReducer = combineReducers({
  blackjack, 
  bets
});

export default rootReducer;