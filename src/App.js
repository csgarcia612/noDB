import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import FighterRoster from "./Components/FighterRoster";
import BattleComponent from "./Components/BattleComponent";

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      playerOne: [],
      playerTwo: [],
      fighterOneImage: null,
      fighterOneName: "",
      fighterOnePower: 0,
      fighterTwoImage: null,
      fighterTwoName: "",
      fighterTwoPower: 0
    };
    this.getCharacterList = this.getCharacterList.bind(this);
    this.selectFighterOne = this.selectFighterOne.bind(this);
    this.selectFighterTwo = this.selectFighterTwo.bind(this);
    this.changeFighterOne = this.changeFighterOne.bind(this);
    this.changeFighterTwo = this.changeFighterTwo.bind(this);
    this.newMatchOne = this.newMatchOne.bind(this);
    this.battle = this.battle.bind(this);
  }

  componentDidMount() {
    this.getCharacterList();
  }

  getCharacterList() {
    // READ/GET action
    axios.get(`/api/characters?id=${0}`).then(res => {
      this.setState({
        characters: res.data
      });
    });
  }

  selectFighterOne() {
    let playerOneCharacter = Math.floor(Math.random() * (25 - 1) + 1);
    axios.post(`/api/playerone?p1=${playerOneCharacter}`).then(res => {
      this.setState({
        playerOne: res.data,
        fighterOneImage: res.data[0][0].image,
        fighterOneName: res.data[0][0].name,
        fighterOnePower: res.data[0][0].power
      });
    });
    // CREATE/POST action
    // Add a random character to p1 container and a different character to p2 container
    // var ID = Math.floor(Math.random() * <highest possible ID> - <lowest possible ID>) + <lowest possible ID>
  }

  selectFighterTwo() {
    let playerTwoCharacter = Math.floor(Math.random() * (25 - 1) + 1);
    axios.post(`/api/playertwo?p2=${playerTwoCharacter}`).then(res => {
      this.setState({
        playerTwo: res.data,
        fighterTwoImage: res.data[0][0].image,
        fighterTwoName: res.data[0][0].name,
        fighterTwoPower: res.data[0][0].power
      });
    });
  }

  changeFighterOne() {
    // UPDATE/PUT action
    // Run randomizer again to choose a new fighter
    let changePlayerOne = Math.floor(Math.random() * (25 - 1) + 1);
    axios.put(`/api/changeone/`, { changePlayerOne }).then(res => {
      this.setState({
        playerOne: res.data,
        fighterOneImage: res.data[0][0].image,
        fighterOneName: res.data[0][0].name,
        fighterOnePower: res.data[0][0].power
      });
    });
  }

  changeFighterTwo() {
    // UPDATE/PUT action
    // Run randomizer again to choose a new fighter
    let changePlayerTwo = Math.floor(Math.random() * (25 - 1) + 1);
    // axios.put(`/api/changetwo?cp2=${changePlayerTwo}`).then(res => {
    axios.put(`/api/changetwo/`, { changePlayerTwo }).then(res => {
      this.setState({
        playerTwo: res.data,
        fighterTwoImage: res.data[0][0].image,
        fighterTwoName: res.data[0][0].name,
        fighterTwoPower: res.data[0][0].power
      });
    });
  }

  newMatchOne() {
    // DELETE action
    // Clear characters from p1 and p2 containers
    axios.delete(`/api/deleteone/`).then(res => {
      this.setState({
        playerOne: res.data
      });
    });
  }

  newMatchTwo() {
    axios.delete(`/api/deletetwo/`).then(res => {
      this.setState({
        playerTwo: res.data
      });
    });
  }

  battle(val1, val2) {
    val1 > val2
      ? alert(`WINNER : ${this.state.fighterOneName}`)
      : val1 === val2
      ? alert(
          `${this.state.fighterOneName} AND ${
            this.state.fighterTwoName
          } ARE BOTH LOSERS!`
        )
      : alert(`WINNER : ${this.state.fighterTwoName}`);
  }

  render() {
    const { characters, fighterOnePower, fighterTwoPower } = this.state;
    const chooseFighterOne = (
      <button
        className="pickP1"
        onClick={() => {
          this.state.playerOne.length === 0
            ? this.selectFighterOne()
            : alert("P1 : ONE FIGHTER PER MATCH");
        }}
      >
        SELECT FIGHTER 1
      </button>
    );

    const chooseFighterTwo = (
      <button
        className="pickP2"
        onClick={() => {
          this.state.playerTwo.length === 0
            ? this.selectFighterTwo()
            : alert("P2 : ONE FIGHTER PER MATCH");
        }}
      >
        SELECT FIGHTER 2
      </button>
    );

    const cornerOne = this.state.playerOne.map(card => {
      return (
        <div key={this.state.playerOne[0][0].name} className="oneCard">
          <img src={this.state.fighterOneImage} alt="FIGHTER 1" />
          <button
            className="changeOne"
            onClick={() => {
              this.state.playerOne.length === 1
                ? this.changeFighterOne()
                : alert("P1 : TOO MANY FIGHTERS");
            }}
          >
            CHANGE FIGHTER 1
          </button>
        </div>
      );
    });

    const cornerTwo = this.state.playerTwo.map(card => {
      return (
        <div key={this.state.playerTwo[0][0].name} className="twoCard">
          <img src={this.state.fighterTwoImage} alt="FIGHTER 2" />
          <button
            className="changeTwo"
            onClick={() => {
              this.state.playerTwo.length === 1
                ? this.changeFighterTwo()
                : alert("P2 : TOO MANY FIGHTERS");
            }}
          >
            CHANGE FIGHTER 2
          </button>
        </div>
      );
    });

    const emptyCornerOne = this.state.playerOne.map(card => {
      return (
        <div key={this.state.playerOne[0][0].name} className="clearedOne">
          <button
            className="removeFighter"
            onClick={() => {
              this.state.playerOne.length === 1
                ? this.newMatchOne()
                : alert("P1 : FIGHTER NEEDED");
            }}
          >
            REMOVE FIGHTER 1
          </button>
        </div>
      );
    });

    const emptyCornerTwo = this.state.playerTwo.map(card => {
      return (
        <div key={this.state.playerTwo[0][0].name} className="clearedTwo">
          <button
            className="removeFighter"
            onClick={() => {
              this.state.playerTwo.length === 1
                ? this.newMatchTwo()
                : alert("P2 : FIGHTER NEEDED");
            }}
          >
            REMOVE FIGHTER 2
          </button>
        </div>
      );
    });

    return (
      <div className="App">
        <header>
          <div className="title-banner">
            <h3>President "Evil Morty" Presents:</h3>
            <h1>THE CITADEL BATTLE ARENA</h1>
          </div>
        </header>

        <section className="arena">
          <div className="player-one-container">
            <div>{chooseFighterOne}</div>
            <div>{cornerOne}</div>
            <div>{emptyCornerOne}</div>
          </div>
          <div className="player-two-container">
            <div>{chooseFighterTwo}</div>
            <div>{cornerTwo}</div>
            <div>{emptyCornerTwo}</div>
          </div>
          <div>
            <BattleComponent
              power1={fighterOnePower}
              power2={fighterTwoPower}
              fighting={this.battle}
            />
          </div>
        </section>

        <section className="roster">
          <div className="fighter-pics-container">
            <FighterRoster characters={characters} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
