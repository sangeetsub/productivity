const express = require("express");
const { check, validationResult } = require("express-validator");
const taskRouter = express.Router();

const Task = require("../models/Task");

/**
 * @method - POST
 * @param - /insert
 * @description - Insert a new task
 */
taskRouter.post(
  "/insert",
  [
    check("name", "Please enter a valid task name").isString(),
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
    console.log(req.body)
    const { name, description, urgency, importancy, userId } = req.body;
    try {
      task = Task({ name, description, urgency, importancy, userId });
      await task.save();
      res.json(task);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in saving");
    }
  }
);

/**
 * @method - GET
 * @param - /task/task
 * @description - returns task for specific user by userId task.
 */
taskRouter.get("/tasks/id", async (req, res) => {
  try {
    const userId = Object.keys(req.query)[0];
    const tasks = await Task.find({}).where({ userId: userId });
    res.json(tasks);
  } catch (e) {
    res.send({ message: "Error in getting task. user." });
  }
});

/**
 * @method - DELETE
 * @param - /task/task
 * @description - Delete a task.
 */
taskRouter.delete("/tasks/id", async (req, res) => {
  const taskId = Object.keys(req.query)[0];
  try {
    await Task.findByIdAndDelete(taskId);
    res.send({ message: "Task deleted successfully" });
  } catch (e) {
    res.send({ message: "Error in deleting task" });
  }
});

module.exports = taskRouter;
