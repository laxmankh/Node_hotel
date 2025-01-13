const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
// const MongoURL = "mongodb://localhost:27017/hotel";
const MongoURL = process.env.local_mongo;
mongoose.connect(MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => {
  console.log("connected to mongodb");
});
module.exports = db;
