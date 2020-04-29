const mongoose = require("mongoose");

const player = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  celphone: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  level: {
    type: Number,
  },
  classe: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

const playerSchema = mongoose.model("player", player);

module.exports = playerSchema;
