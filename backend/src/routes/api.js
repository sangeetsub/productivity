const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const User = require("../models/user"); 



router.get("/todos", (req, res, next) => {
  // returns all data, exposing only the id and action field for the client
  Todo.find({}, "action")
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/todos", (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.delete("/todos/:id", (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

//TODO

router.get("/auth/user",(req,res,next) => {
  // returns all data, exposing only the id and action field for the client
  console.log("User find ")
  User.find({},"action")
    .then((data) => res.json(data))
    .catch(next);
});


router.post("/auth/signup", (req, res, next) => {
  console.log("Signup API hit from frontend.")
  if(req.body.action){
    User.create(req.body)
    .then((data)=>res.json(data))
    .catch(next); 
  }else{
    res.json({
      error : "Something went wrong while signing up."
    })
  }
})




module.exports = router;
