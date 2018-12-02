const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const data = require("./rmcharacters.json");
const controller = require("./controllers/controller");
const PORT = 4000;

app.use(bodyParser.json());

app.get("/api/characters", controller.readCharacters);

app.post("/api/playerone", controller.pickFighterOne);

app.post("/api/playertwo", controller.pickFighterTwo);

app.put("/api/changeone", controller.changeFighterOne);

app.put("/api/changetwo", controller.changeFighterTwo);

app.delete("/api/deleteone", controller.clearFighterOne);

app.delete("/api/deletetwo", controller.clearFighterTwo);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
