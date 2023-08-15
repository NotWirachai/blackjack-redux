export const UPDATE_BET = 'UPDATE_BET';
export const UPDATE_PLAYER_BALANCE = 'UPDATE_PLAYER_BALANCE';

export function dispatchBet(param) {
    return {
      type: param.type,
      payload: param.payload,
    };
  }