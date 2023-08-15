import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_BET,
  UPDATE_PLAYER_BALANCE,
  dispatchBet,
} from "../../redux/actions/bet";
import "./bet.css";

function BlackjackGame() {
  const dispatch = useDispatch();
  const { result } = useSelector(
    (state) => state.blackjack
  );
  const { bet, playerBalance } = useSelector(
    (state) => state.bet
  );

  console.log("bet:>>", bet);
  console.log("playerBalance:>>", playerBalance);

  const handleBetChange = (event) => {
    dispatch(
      dispatchBet({
        type: UPDATE_BET,
        payload: parseInt(event.target.value),
      })
    );
  };

  const handlePlaceBet = () => {
    if (bet <= playerBalance) {
      console.log("Bet");
      dispatch(
        dispatchBet({
          type: UPDATE_PLAYER_BALANCE,
          payload: playerBalance - bet,
        })
      );
    } else {
      alert("Insufficient balance!");
      // Handle insufficient balance
    }
  };

  useEffect(() => {
    if (result === "Win" || result !== "None") {
      if (result === "Win" || result === "Blackjack") {
        dispatch(
          dispatchBet({
            type: UPDATE_PLAYER_BALANCE,
            payload: playerBalance + bet * 2,
          })
        );
      } else {
        dispatch(
          dispatchBet({
            type: UPDATE_PLAYER_BALANCE,
            payload: playerBalance - bet,
          })
        );
      }
    }
  }, [result]);

  return (
    <div>
      <label>Bet:</label>
      <input className="bet" type="number" value={bet} onChange={handleBetChange} />
      {/* <button onClick={handlePlaceBet}>Place Bet</button> */}
      {/* <p>Player Balance: {playerBalance}</p> */}
    </div>
  );
}

export default BlackjackGame;
