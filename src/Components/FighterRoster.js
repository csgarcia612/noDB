import React, { Component } from "react";
import FighterImageComponent from "./FighterImageComponent";

class FighterRoster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: ""
    };
    this.playerOneName = this.playerOneName.bind(this);
    this.playerTwoName = this.playerTwoName.bind(this);
  }

  playerOneName(event) {
    return this.setState({
      player1: event.target.value
    });
  }

  playerTwoName(event) {
    return this.setState({
      player2: event.target.value
    });
  }

  render() {
    const { characters } = this.props;
    const characterCollection = characters.length
      ? characters.map(card => {
          return <FighterImageComponent key={card.name} image={card.image} />;
        })
      : "GATHERING FIGHTERS";
    return (
      <div>
        <div className="playerNameDisplay">
          <p className="nameOne">PLAYER 1 : {this.state.player1}</p>
          <p className="nameTwo">PLAYER 2 : {this.state.player2}</p>
        </div>
        <div className="playerNameInput">
          <input
            className="textBoxOne"
            placeholder="ENTER NAME"
            value={this.state.player1}
            onChange={this.playerOneName}
          />
          <input
            className="textBoxTwo"
            placeholder="ENTER NAME"
            value={this.state.player2}
            onChange={this.playerTwoName}
          />
        </div>
        <div className="characterCollection">{characterCollection};</div>
      </div>
    );
  }
}

export default FighterRoster;
