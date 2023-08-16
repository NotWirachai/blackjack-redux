export const START_REQUEST = 'START_REQUEST';
export const HIT_REQUEST = 'HIT_REQUEST';
export const STAND_REQUEST = 'STAND_REQUEST';
export const API_FAILURE = 'API_FAILURE';
export const API_SUCCESS = 'API_SUCCESS';
export const USERNAME = 'USERNAME';

export function dispatchBlackjack(param) {
    return {
      type: param.type,
      payload: param.payload,
    };
  }
