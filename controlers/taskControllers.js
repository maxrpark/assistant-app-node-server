const Task = require("../models/taskModels");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error });
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ task });
  } catch (error) {
    res.status(500).json({ msg: "something when wrong" });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findOneAndDelete({ _id: id });
    res.status(200).send({ msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: "something when wrong" });
  }
};

const deteleAll = async (req, res) => {
  try {
    const task = await Task.deleteMany({});
    res.status(200).send(task);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  deteleAll,
};
