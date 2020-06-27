const express = require("express");
const bodyParser = require("body-parser");
const user = require("./src/routes/user");
const task = require("./src/routes/task");

const cors = require("cors");
require("dotenv").config();

const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());

//Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "First Api working." });
});

/**
 * Router Middleware
 * Router = /user/*
 * Method - *
 */
app.use("/user", user);

/**
 * Router Middleware
 * Router = /task/*
 * Method - *
 */
app.use("/task", task);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
