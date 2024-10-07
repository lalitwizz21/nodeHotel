const express = require("express");
require("dotenv").config();
require("./db");
const passport = require("./auth.js");

const app = express();
app.use(express.json());

// Initialized the passport.
app.use(passport.initialize());

const personAuthenticator = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  console.log("Request for the '/' route.");
  res.send("Welcome to the home page...");
});

const personRoutes = require("./routes/person.js");
app.use("/person", personAuthenticator, personRoutes);

const menuRoutes = require("./routes/menu.js");
app.use("/menu", menuRoutes);

app.listen(4000, () => {
  console.log("listening on 127.0.0.1:4000");
});
