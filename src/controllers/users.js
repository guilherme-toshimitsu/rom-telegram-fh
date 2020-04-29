const User = require("../models/users");

const createNewUser = async () => {
  let newUser = new User({
    name: "Guilherme",
    email: "teste@teste",
  });

  await newUser.save();
};

const readAllUser = async () => {
  await User.find((err, res) => console.log(err, res));
};

module.exports = {
  createNewUser,
  readAllUser,
};
