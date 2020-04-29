const mongoose = require("mongoose");

const classes = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  job: {
    required: true,
    type: Number,
  },
});

const classesSchema = mongoose.model("classes", classes);

module.exports = classesSchema;
