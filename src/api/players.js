const express = require("express");
const router = express.Router();

const {
  findPlayersByClasse,
  findPlayersByName,
  findAllPlayers,
} = require("../controllers/players");

router.get("/getAll", async (req, res, next) => {
  const data = await findAllPlayers();
  res.send(data);
});

router.get("/getByName/:name", async (req, res, next) => {
  const data = await findPlayersByName(req.params.name);
  res.send(data);
});

router.get("/getByJob/:job", async (req, res, next) => {
  const data = await findPlayersByClasse(req.params.job);
  res.send(data);
});

module.exports = router;
