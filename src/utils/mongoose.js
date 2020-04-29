const mongoose = require("mongoose");

const connection = "mongodb://localhost:27017/romfh";

const connect = () => mongoose.connect(connection);

module.exports = connect;
