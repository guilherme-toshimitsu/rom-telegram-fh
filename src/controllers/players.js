const Players = require("../models/players");

const addorUpdatePlayersToDB = (name, celphone, level, classe) => {
  return Players.update(
    { celphone },
    { name, celphone, level, classe, active: true },
    { upsert: true }
  );
};

const findAllPlayers = () => {
  return Players.find({}, { job: false, _id: false, __v: 0 });
};

const findPlayersByName = (name) => {
  return Players.find({ name, active: true });
};

const findPlayersByClasse = (classe) => {
  return Players.find({ classe, active: true });
};

const findPlayersByCelphone = (celphone) => {
  return Players.find({ celphone });
};

const deactivatePlayer = (name) => {
  return Players.update({ name }, { active: false });
};

module.exports = {
  addorUpdatePlayersToDB,
  findAllPlayers,
  findPlayersByName,
  findPlayersByClasse,
  findPlayersByCelphone,
  deactivatePlayer,
};
