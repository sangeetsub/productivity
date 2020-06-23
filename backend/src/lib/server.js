"use strict";

// import cors from "cors";
// import express, { request, response } from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

// env variables
const PORT = process.env.PORT || 8000;
const MONGODB_URI =
  process.env.MONGODB_URI + "mongodb://localhost/mern-starter";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(bodyParser.json(), cors());

app.use(require("../routes/auth-router"));

app.all("*", (request, response) => {
  console.log("Returning a 404 from the catch-all route");
  return response.sendStatus(404);
});

// error middleware
app.use(require("./error-middleware"));

const start = () => {
  app.listen(PORT, () => {
    console.log(`Listening to port : ${PORT}`);
  });
};

const stop = () => {
  app.close(PORT, () => {
    console.log(`Shut down on port : ${PORT}`);
  });
};

module.exports = start;
module.exports = stop;
