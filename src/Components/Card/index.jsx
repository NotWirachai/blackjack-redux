import React, { Component } from "react";
import "./card.css";
import clubs from "../../assets/clubs.webp";
import diamonds from "../../assets/diamonds.webp";
import hearts from "../../assets/hearts.avif";
import spades from "../../assets/spades.png";

class Card extends Component {
    renderSuitImage() {
    const { card } = this.props;

    if (card?.suit === "S") {
      return <img src={spades} alt="Spades" className="suit-image"/>;
    } else if (card?.suit === "D") {
      return <img src={diamonds} alt="Diamonds" className="suit-image"/>;
    } else if (card?.suit === "H") {
      return <img src={hearts} alt="Hearts" className="suit-image"/>;
    } else if (card?.suit === "C") {
      return <img src={clubs} alt="Clubs" className="suit-image"/>;
    }

    return null;
  }

  render() {
    const { card } = this.props;
    return (
    <div className="card">
        <span className="rank rank-top-right">{card?.rank}</span>
        {this.renderSuitImage()}
        <span className="rank rank-bottom-left">{card?.rank}</span>
      </div>
    //   <div className="card">
    //     <span className="rank">{card?.rank}</span>
    //     {/* <span className="suit">{card?.suit}</span> */}
    //     {this.renderSuitIcon()}
    //   </div>
    );
  }
}

export default Card;
