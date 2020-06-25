const express = require("express");
const bodyParser = require("body-parser");
const user = require("./src/routes/user");
require("dotenv").config();

const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

const app = express();

const port = process.env.PORT || 8000;

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const mongoose = require("mongoose");
// const routes = require("./src/routes/api");
// const path = require("path");

//connect to the database
// mongoose
//   .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log(`Database Connected Successfully.`))
//   .catch((err) => console.log(err));

// // since mongoose promise is depricated, we override it with node's promise
// mongoose.Promise = global.Promise;

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use("/api", routes);

// app.use((req, res, next) => {
//   res.send("Welcome to Express");
// });

// app.use((err, req, res, next) => {
//   console.log(err);
//   next();
// });
