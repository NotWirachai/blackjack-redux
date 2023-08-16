import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_BET,
  UPDATE_PLAYER_BALANCE,
  dispatchBet,
} from "../../redux/actions/bets";
import "./bet.css";
import Modal from "../Modal";

const BlackjackGame = () => {
  const dispatch = useDispatch();
  // const [isModalOpen, setIsModalOpen] = useState(false);
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

  // useEffect(() => {
  //   if (playerBalance === 0) {
  //     if (result === "Lose" || result === "Bust") {
  //       setIsModalOpen(true);
  //     }
  //   }
  // }, [playerBalance, result]);

  // const resetGame = () => {
  //   window.location.reload(false);
  //   setIsModalOpen(false);
  // };

  return (
    <div>
      <div>
        <label>Bet: {bet}</label>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "40vh" }}>
        <div onClick={() => handlePlaceBet(10)} className="dashed-circle">
          <a>10</a>
        </div>
        <div onClick={() => handlePlaceBet(50)} className="dashed-circle">
          <a>50</a>
        </div>
        <div onClick={() => handlePlaceBet(100)} className="dashed-circle">
          <a>100</a>
        </div>
        <div
          onClick={() => handlePlaceBet(playerBalance)}
          className="dashed-circle"
        >
          <a>All</a>
        </div>
      </div>
      {/* <Modal isOpen={isModalOpen}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "red" }}>คุณหมดตูดแล้ว</h2>
          <p style={{ color: "red" }}>อยากเริ่มใหม่ไหม</p>
          <button className="button1" onClick={() => resetGame()}>
            reset
          </button>
        </div>
      </Modal> */}
    </div>
  );
};

export default BlackjackGame;
