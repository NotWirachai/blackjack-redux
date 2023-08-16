import React, { Component } from "react";
import ControlGame from "./Components/Contoller";
import Dealer from "./Components/CardDealer";
import Player from "./Components/CardPlayer";
import { connect } from "react-redux";

class BlackjackGame extends Component {
  render() {
    const { result, error, playerBalance } = this.props;
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "5px double #FFD700",
            position: "relative",
            zIndex: "1",
            color: "aliceblue",
            backgroundColor: "#008000",
          }}
        >
          <h1 style={{ textShadow: "2px 2px #FF0000" }}>Black Jack</h1>
          <ControlGame />
          <p>Player Balance: {playerBalance}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {result !== "" && <Player />}
            {result !== "" && <Dealer />}
          </div>
          <br />
          {result !== "" && (
            <h2
              style={{
                textShadow: `${
                  result === "Win"
                    ? "2px 2px #FF0000"
                    : ""
                }`,
              }}
            >
              Result: {result}
            </h2>
          )}
          {error && <div style={{ color: "red" }}>Error: {error}</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.blackjack.result,
  playerBalance: state.bets.playerBalance,
  error: state.blackjack.error,
});

export default connect(mapStateToProps)(BlackjackGame);
