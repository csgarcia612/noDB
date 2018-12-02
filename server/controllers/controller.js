const data = require("../rmcharacters.json");
let playerOneChoice = [];
let playerTwoChoice = [];

module.exports = {
  readCharacters: (req, res) => {
    res.status(200).send(data);
  },
  pickFighterOne: (req, res) => {
    let { p1 } = req.query;
    let searchFightersOne = data.filter(val => val.id === +p1);
    playerOneChoice.push(searchFightersOne);
    res.status(200).send(playerOneChoice);
  },
  pickFighterTwo: (req, res) => {
    let { p2 } = req.query;
    let searchFightersTwo = data.filter(val => val.id === +p2);
    playerTwoChoice.push(searchFightersTwo);
    res.status(200).send(playerTwoChoice);
  },
  changeFighterOne: (req, res) => {
    let { changePlayerOne } = req.body;
    let searchNewFightersOne = data.filter(val => val.id === changePlayerOne);
    playerOneChoice.splice(0, 1, searchNewFightersOne);
    res.status(200).send(playerOneChoice);
  },
  changeFighterTwo: (req, res) => {
    // console.log("changefighter2 req.body", req.body);
    // let { cp2 } = req.query;
    let { changePlayerTwo } = req.body;
    // let searchNewFightersTwo = data.filter(val => val.id === cp2);
    let searchNewFightersTwo = data.filter(val => val.id === changePlayerTwo);
    playerTwoChoice.splice(0, 1, searchNewFightersTwo);
    res.status(200).send(playerTwoChoice);
  },
  clearFighterOne: (req, res) => {
    playerOneChoice.splice(0, 1);
    res.status(200).send(playerOneChoice);
  },
  clearFighterTwo: (req, res) => {
    playerTwoChoice.splice(0, 1);
    res.status(200).send(playerTwoChoice);
  }
};
