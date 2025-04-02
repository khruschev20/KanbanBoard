const express = require("express");
const { Task } = require("../models");

const router = express.Router();

// Get All Tasks
router.get("/", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// Create Task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Update Task Status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Task.update({ status }, { where: { id } });
  res.json({ message: "Task Updated" });
});

// Delete Task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.json({ message: "Task Deleted" });
});

module.exports = router;
