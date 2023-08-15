import React, { Component } from "react";
import ControlGame from "./Components/Contoller";
import Dealer from "./Components/CardDealer";
import Player from "./Components/CardPlayer";
import { connect } from "react-redux";

class BlackjackGame extends Component {
  render() {
    const { result, error } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Black Jack</h1>
        <ControlGame />
        {result !== "" && <Player />}
        {result !== "" && <Dealer />}
        <br />
        {result !== "" && <h2>Result: {result}</h2>}
        {error && <div>Error: {error}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.blackjack.result,
  error: state.blackjack.error,
});

export default connect(mapStateToProps)(BlackjackGame);
