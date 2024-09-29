const express = require("express");
require("dotenv").config();
const db = require("./db.js");

const app = express();
app.use(express.json());

const logging = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] - ${req.path}`);
  next();
}

app.use(logging);

app.get("/", (req, res) => {
  res.send("Welcome to the home page...");
});

const personRoutes = require("./routes/person.js");
app.use("/person", personRoutes);

const menuRoutes = require("./routes/menu.js");
app.use("/menu", menuRoutes);

app.listen(4000, () => {
  console.log("listening on 127.0.0.1:4000");
});
