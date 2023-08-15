import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../Card';

class Dealer extends Component {
  render() {
    const { dealer } = this.props;
    console.log("dealer:>>",dealer);
    return (
        <div style={{padding: 20}}>
          <h2 style={{textAlign:"center"}}>Dealer</h2>
          <p>Score: {dealer?.score}</p>
          <div style={{display:"flex"}}>
            {dealer?.cards?.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dealer: state.blackjack.dealer,
});

export default connect(mapStateToProps)(Dealer);
// export default Dealer;