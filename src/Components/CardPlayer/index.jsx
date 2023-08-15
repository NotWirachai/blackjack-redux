import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Card';


class Player extends Component {
  
  render() {
    const { player,playerBalance} = this.props;
    console.log("player:>>",player);
    return (
      <div style={{padding: 20}}>
        <div>
          <h2>Player: {player?.username}</h2>
          <p>Score: {player?.score}</p>
          <p>Player Balance: {playerBalance}</p>
          <div style={{display:"flex"}}>
            {player?.cards?.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.blackjack.player,
  playerBalance: state.bet.playerBalance
});

export default connect(mapStateToProps)(Player);
