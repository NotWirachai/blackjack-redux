import React, { Component } from "react";
import { connect } from "react-redux";
import Bet from "../Bet";
import {
  USERNAME,
  START_REQUEST,
  HIT_REQUEST,
  STAND_REQUEST,
  dispatchBlackjack,
} from "../../redux/actions/blackjack";
import { UPDATE_PLAYER_BALANCE, dispatchBet } from "../../redux/actions/bets";
import "./contoller.css";

class ControlGame extends Component {
  state = {
    username: "",
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    this.props.dispatchBlackjack({
      type: USERNAME,
      payload: event.target.value,
    });
  };

  handleStart = async () => {
    const { username } = this.state;
    const { bet, playerBalance } = this.props;
    if (bet <= playerBalance && username) {
      // betting
      this.props.dispatchBet({
        type: UPDATE_PLAYER_BALANCE,
        payload: playerBalance - bet,
      });
      // Start Game
      this.props.dispatchBlackjack({
        type: START_REQUEST,
      });
    } else {
      alert("Insufficient balance and username!");
    }
  };

  handleHit = async () => {
    this.props.dispatchBlackjack({
      type: HIT_REQUEST,
    });
  };

  handleStand = async () => {
    this.props.dispatchBlackjack({
      type: STAND_REQUEST,
    });
  };

  render() {
    const { username } = this.state;
    const { bet, result } = this.props;
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
