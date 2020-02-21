const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  facebookToken: {
    type: String
  },
  facebookId: {
    type: String
  },
  googleToken: {
    type: String
  },
  googleId: {
    type: String
  }
});

const User = mongoose.model(UserSchema);

module.exports = User;
