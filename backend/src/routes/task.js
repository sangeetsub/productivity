const express = require("express");
const { check, validationResult } = require("express-validator");
const taskRouter = express.Router();

const Task = require("../models/Task");

/**
 * @method - POST
 * @param - /insert
 * @description - User Signup
 */
taskRouter.post(
  "/insert",
  [
    check("name", "Please enter a valid email").isString(),
    check("description", "Please enter a valid description").isString(),
    check("urgency", "Please enter a valid urgency").isNumeric(),
    check("importancy", "Please enter a valid password").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, description, urgency, importancy, userId } = req.body;
    try {
      task = Task({ name, description, urgency, importancy, userId });

      console.log(task);

      await task.save();

      res.status(200).send("Inserted successfully");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in saving");
    }
  }
);

/**
 * @method - GET
 * @param - /task/task
 * @description - Get LoggedIn User
 */
taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (e) {
    res.send({ message: "Error in Fetching user." });
  }
});

module.exports = taskRouter;
