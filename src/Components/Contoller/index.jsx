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
import Modal from "../Modal";

class ControlGame extends Component {
  state = {
    username: "",
    isModalOpen: false,
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
    if (bet <= playerBalance) {
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
      // alert("Insufficient balance and username!");
      this.setState({ isModalOpen: true });
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

  resetGame = () => {
    window.location.reload(false);
    this.setState({ isModalOpen: false });
  };

  render() {
    const { username, isModalOpen } = this.state;
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
            disabled={bet === 0 || result === "None" || username === "" ? true : false}
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
        <Modal isOpen={isModalOpen}>
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
            <button className="button1" onClick={this.resetGame}>
              Reset
            </button>
          </div>
        </Modal>
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
