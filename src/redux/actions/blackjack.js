export const START_REQUEST = 'START_REQUEST';
export const HIT_REQUEST = 'HIT_REQUEST';
export const STAND_REQUEST = 'STAND_REQUEST';
export const API_FAILURE = 'API_FAILURE';

export function dispatchBlackjack(param) {
    return {
      type: param.type,
      payload: param.payload,
    };
  }

// export const startRequest = (data) => {
//     return {
//         type: START_REQUEST,
//         payload: {
//             data,
//         }
//     }
// }

// export const hitRequest = (data) => {
//     return {
//         type: HIT_REQUEST,
//         payload: {
//             data,
//         }
//     }
// }

// export const standRequest = (data) => {
//     return {
//         type: STAND_REQUEST,
//         payload: {
//             data,
//         }
//     }
// }

// export const apiSuccess = (data) => {
//     return {
//         type: API_SUCCESS,
//         payload: data
//     }
// }

// export const apiFailure = (error) => {
//     return {
//         type: API_FAILURE,
//         payload: error
//     }
// }
