import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_BET,
  UPDATE_PLAYER_BALANCE,
  dispatchBet,
} from "../../redux/actions/bets";
import "./bet.css";

const BlackjackGame = () => {
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.blackjack);
  const { bet, playerBalance } = useSelector((state) => state.bets);

  // console.log("bet:>>", bet);
  // console.log("playerBalance:>>", playerBalance);

  const handlePlaceBet = (coin) => {
    console.log("coin:>>", coin);
    if (result !== "None") {
      dispatch(
        dispatchBet({
          type: UPDATE_BET,
          payload: parseInt(coin),
        })
      );
    } else {
      alert("Betting time has expired.");
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
      } else if (result === "Push") {
        console.log("Push");
        dispatch(
          dispatchBet({
            type: UPDATE_PLAYER_BALANCE,
            payload: playerBalance + bet,
          })
        );
      } else {
        console.log("Lose");
      }
    }
  }, [result]);

  return (
    <div>
      <div>
        <label>Bet: {bet}</label>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div onClick={() => handlePlaceBet(10)} className="dashed-circle">
          <a>10</a>
        </div>
        <div onClick={() => handlePlaceBet(50)} className="dashed-circle">
          <a>50</a>
        </div>
        <div onClick={() => handlePlaceBet(100)} className="dashed-circle">
          <a>100</a>
        </div>
      </div>
      {/* <input
        className="bet"
        type="number"
        value={bet}
        onChange={handleBetChange}
      />
      <p>Player Balance: {playerBalance}</p> */}
    </div>
  );
};

export default BlackjackGame;
