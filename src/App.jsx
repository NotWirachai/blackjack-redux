import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRequest, hitRequest, standRequest } from './redux-saga-backup/redux'; // นี่คือไฟล์ Actions ที่คุณสร้างขึ้นมา

function BlackjackGame() {
  const dispatch = useDispatch();
  const { dealer, player, result, error } = useSelector(state => state);

  const handleStart = () => {
    dispatch(startRequest("UUUUUUA"));
  };

  const handleHit = () => {
    dispatch(hitRequest("UUUUUUA"));
  };

  const handleStand = () => {
    dispatch(standRequest("UUUUUUA"));
  };

  // console.log("dealer:>>",dealer);
  // console.log("player:>>",player);
  // console.log("result:>>",result);

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStand}>Stand</button>
      <div>
        <h2>Dealer:</h2>
        <p>Score: {dealer?.score}</p>
        <p>Cards: {dealer?.cards?.map(card => `${card?.rank}${card?.suit}`).join(', ')}</p>
      </div>
      <div>
        <h2>Player:</h2>
        <p>Score: {player?.score}</p>
        <p>Cards: {player?.cards?.map(card => `${card?.rank}${card?.suit}`).join(', ')}</p>
      </div>
      <p>Result: {result}</p>
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default BlackjackGame;
