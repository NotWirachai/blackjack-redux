// import api from "./api";

// export const startGame = (username) => async () => {
//   console.log("username:>>",username)
//   try {
//     const response = await api.post("/start", { username });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const hit = (username) => async () => {
//   try {
//     const response = await api.post("/hit", { username });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const stand = (username) => async () => {
//   try {
//     const response = await api.post("/stand", { username });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export default {
//   startGame,
//   hit,
//   stand
// };

import api from "./api";

const blackjackProvider = {
  startGame: async (username) => {
    // console.log("username:>>", username);
    try {
      const response = await api.post("/start", { username });
      return response;
    } catch (error) {
      return error;
    }
  },

  hit: async (username) => {
    try {
      const response = await api.post("/hit", { username });
      return response;
    } catch (error) {
      return error;
    }
  },

  stand: async (username) => {
    try {
      const response = await api.post("/stand", { username });
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default blackjackProvider;
