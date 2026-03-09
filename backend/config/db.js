const mongoose = require("mongoose");

const dbConnection = () => {
  const DB_URI = process.env.MONGO_URI;
  
  mongoose.connect(DB_URI);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection Error"))
  db.once("open", () => {
    console.log("Database is connected successfully!")
  })
};

module.exports = dbConnection;