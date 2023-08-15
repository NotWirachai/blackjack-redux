import React, { Component } from "react";
import { connect } from "react-redux";
import Bet from "../Bet";
import {
  START_REQUEST,
  HIT_REQUEST,
  STAND_REQUEST,
  API_FAILURE,
  dispatchBlackjack,
} from "../../redux/actions/blackjack";
import { UPDATE_PLAYER_BALANCE, dispatchBet } from "../../redux/actions/bet";
import axios from "axios";
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
    console.log("Bet",bet);
    console.log("playerBalance",playerBalance);
    if (bet <= playerBalance) {
      this.props.dispatchBet({
        type: UPDATE_PLAYER_BALANCE,
        payload: playerBalance - bet,
      });
      try {
        const response = await axios.post(`${baseUrl}/start`, { username });
        this.props.dispatchBlackjack({
          type: START_REQUEST,
          payload: response.data,
        });
      } catch (error) {
        this.props.dispatchBlackjack({
          type: API_FAILURE,
          payload: error.message,
        });
      }
    } else {
      alert("Insufficient balance!");
    }
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
  };

  handleHit = async () => {
    const { username } = this.state;
    try {
      const response = await axios.post(`${baseUrl}/hit`, { username });
      this.props.dispatchBlackjack({
        type: HIT_REQUEST,
        payload: response.data,
      });
    } catch (error) {
      this.props.dispatchBlackjack({
        type: API_FAILURE,
        payload: error.message,
      });
    }
  };

  handleStand = async () => {
    const { username } = this.state;
    try {
      const response = await axios.post(`${baseUrl}/stand`, { username });
      this.props.dispatchBlackjack({
        type: STAND_REQUEST,
        payload: response.data,
      });
    } catch (error) {
      this.props.dispatchBlackjack({
        type: API_FAILURE,
        payload: error.message,
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <label>
            Username:
            <input
              type="text"
              className="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </label>
          <Bet />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="button" onClick={this.handleStart}>
            Start
          </button>
          <button className="button" onClick={this.handleHit}>
            Hit
          </button>
          <button className="button" onClick={this.handleStand}>
            Stand
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bet: state.bet.bet,
  playerBalance: state.bet.playerBalance,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchBlackjack: (data) => dispatch(dispatchBlackjack(data)),
    dispatchBet: (bet) => dispatch(dispatchBet(bet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlGame);
