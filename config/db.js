const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env.DB_CONNECTION_STRING);

module.exports = { mongoose, Schema };
