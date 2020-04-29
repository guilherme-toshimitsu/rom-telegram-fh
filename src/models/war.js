const mongoose = require("mongoose");

const war = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  players: {
    type: Array,
  },
});

const warSchema = mongoose.model("warAtt", war);

module.exports = warSchema;
