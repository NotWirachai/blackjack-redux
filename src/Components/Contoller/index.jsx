import React, { Component } from "react";
import { connect } from "react-redux";
import Bet from "../Bet";
import {
  START_REQUEST,
  HIT_REQUEST,
  STAND_REQUEST,
  dispatchBlackjack,
} from "../../redux/actions/blackjack";
import { UPDATE_PLAYER_BALANCE, dispatchBet } from "../../redux/actions/bets";
// import axios from "axios";
import "./contoller.css";

const baseUrl = "http://localhost:3001/api";

class ControlGame extends Component {
  state = {
    username: "",
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleStart = async () => {
    const { username } = this.state;
    const { bet, playerBalance } = this.props;
    // console.log("Bet", bet);
    // console.log("playerBalance", playerBalance);
    if (bet <= playerBalance && username) {
      this.props.dispatchBet({
        type: UPDATE_PLAYER_BALANCE,
        payload: playerBalance - bet,
      });
      this.props.dispatchBlackjack({
        type: START_REQUEST,
        payload: username,
      });
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
    } else {
      alert("Insufficient balance and username!");
    }
  };

  handleHit = async () => {
    const { username } = this.state;
    this.props.dispatchBlackjack({
      type: HIT_REQUEST,
      payload: username,
    });
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
  };

  handleStand = async () => {
    const { username } = this.state;
    this.props.dispatchBlackjack({
      type: STAND_REQUEST,
      payload: username,
    });
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
  };

  render() {
    const { username } = this.state;
    const { bet, playerBalance, result } = this.props;
    return (
      <div>
        <div>
          <label>
            Username:
            <input
              type="text"
              className="username"
              value={username}
              onChange={this.handleUsernameChange}
            />
          </label>
          <Bet />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: `${
              bet && bet !== 0 && username && result === "None"
                ? "space-between"
                : "center"
            }`,
          }}
        >
          <button
            className="button"
            disabled={result === "None" ? true : false}
            onClick={this.handleStart}
          >
            Start
          </button>
          {bet && bet !== 0 && username && result === "None" ? (
            <button className="button" onClick={this.handleHit}>
              Hit
            </button>
          ) : (
            <></>
          )}
          {bet && bet !== 0 && username && result === "None" ? (
            <button className="button" onClick={this.handleStand}>
              Stand
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bet: state.bets.bet,
  playerBalance: state.bets.playerBalance,
  result: state.blackjack.result,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchBlackjack: (data) => dispatch(dispatchBlackjack(data)),
    dispatchBet: (bet) => dispatch(dispatchBet(bet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlGame);
