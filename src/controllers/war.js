const War = require("../models/war");
const moment = require("moment");

const markAtendancy = (player) => {
  const today = moment().format("YYYY-MM-DD");
  return War.update(
    { date: today },
    { $addToSet: { players: player } },
    { upsert: true }
  );
};

const getAtendancy = (date) => {
  return War.find({ date, date });
};

const getAllAtendancy = () => {
  return War.find({});
};

module.exports = {
  markAtendancy,
  getAtendancy,
  getAllAtendancy,
};
