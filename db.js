const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connection is established...");
});

db.on("disconnected", () => {
  console.log("Connection is terminated...");
});

db.on("error", (err) => {
  console.log("Error: ", err);
});

module.exports = db;
