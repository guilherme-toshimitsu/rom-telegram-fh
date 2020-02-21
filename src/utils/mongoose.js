const mongoose = require("mongoose");

const connection = "mongodb://mongodb:27017/romtelegramfh";

const connect = () => mongoose.connect(connection);

module.exports = connect;
