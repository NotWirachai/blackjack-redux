import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { startGame, hit, stand } from './redux/';
import {
  START_REQUEST,
  HIT_REQUEST,
  STAND_REQUEST,
  API_FAILURE,
  dispatchBlackjack,
} from "./redux/actions/blackjack";
import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

class BlackjackGame extends Component {
  state = {
    username: "", 
  };
  
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  // handleStart = () => {
  //   const { username } = this.state;
  //   startGame(username);
  // };

  // handleHit = () => {
  //   const { username } = this.state;
  //   hit(username);
  // };

  // handleStand = () => {
  //   const { username } = this.state;
  //   stand(username);
  // };

 
  handleStart = async () => {
    const { username } = this.state;

      // try {
      //   const response = await axios.post(`${baseUrl}/start`, { username });
      //   this.props.dispatchBlackjack({
      //     type: START_REQUEST,
      //     payload: response.data,
      //   });
      // } catch (error) {
      //   this.props.dispatchBlackjack({
      //     type: API_FAILURE,
      //     payload: error.message,
      //   });
      // }
    try {
      const response = await axios.post(`${baseUrl}/start`, { username })
      // console.log("response:>>", response.data);
      this.props.dispatchBlackjack({ type: START_REQUEST, payload: response.data });
    } catch (error) {
      this.props.dispatchBlackjack({ type: API_FAILURE, payload: error.message });
    }
  };
  
  handleHit = async () => {
    const { username } = this.state;

    // try {
    //   const response = await axios.post(`${baseUrl}/hit`, { username });
    //   this.props.dispatchBlackjack({
    //     type: HIT_REQUEST,
    //     payload: response.data,
    //   });
    // } catch (error) {
    //   this.props.dispatchBlackjack({
    //     type: API_FAILURE,
    //     payload: error.message,
    //   });
    // }
    try {
      const response = await axios.post(`${baseUrl}/hit`, { username });
      this.props.dispatchBlackjack({ type: HIT_REQUEST, payload: response.data });
    } catch (error) {
      this.props.dispatchBlackjack({ type: API_FAILURE, payload: error.message });
    }
  };
  
  handleStand = async () => {
    const { username } = this.state;

    // try {
    //   const response = await axios.post(`${baseUrl}/stand`, { username });
    //   this.props.dispatchBlackjack({
    //     type: STAND_REQUEST,
    //     payload: response.data,
    //   });
    // } catch (error) {
    //   this.props.dispatchBlackjack({
    //     type: API_FAILURE,
    //     payload: error.message,
    //   });
    // }
    try {
      const response = await  axios.post(`${baseUrl}/stand`, { username });
      this.props.dispatchBlackjack({ type: STAND_REQUEST, payload: response.data });
    } catch (error) {
      this.props.dispatchBlackjack({ type: API_FAILURE, payload: error.message });
    }
  };
  

  render() {
    const { dealer, player, result, error } = this.props;
    // console.log("dealer:>>",dealer);
    // console.log("player:>>",player);
    // console.log("result:>>",result);
    // console.log("error:>>",error);
    return (
      <div>
        <div>
          <label>
            Username: 
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </label>
        </div>
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handleHit}>Hit</button>
        <button onClick={this.handleStand}>Stand</button>
        <div>
          <h2>Dealer:</h2>
          <p>Score: {dealer?.score}</p>
          <p>
            Cards:{" "}
            {dealer?.cards
              ?.map((card) => `${card?.rank}${card?.suit}`)
              .join(", ")}
          </p>
        </div>
        <div>
          <h2>Player:</h2>
          <p>Score: {player?.score}</p>
          <p>
            Cards:{" "}
            {player?.cards
              ?.map((card) => `${card?.rank}${card?.suit}`)
              .join(", ")}
          </p>
        </div>
        <p>Result: {result}</p>
        {error && <div>Error: {error}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dealer: state.blackjack.dealer,
  player: state.blackjack.player,
  result: state.blackjack.result,
  error: state.blackjack.error,
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchBlackjack: todoId => dispatch(dispatchBlackjack(todoId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BlackjackGame);
