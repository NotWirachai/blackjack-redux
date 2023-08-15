import { combineReducers } from 'redux';
import blackjack from './blackjack'; 
import bet from './bet'

const rootReducer = combineReducers({
  blackjack, 
  bet
});

export default rootReducer;