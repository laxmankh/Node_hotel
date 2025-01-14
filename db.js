const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MongoURL = process.env.local_mongo;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

connectToDatabase();

const db = mongoose.connection;
module.exports = db;
