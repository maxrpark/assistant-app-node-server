const Task = require("../models/taskModels");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({}).sort("-createdAt");
  res.json(tasks);
};
const createTask = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(createCustomError(`Name can not be empty`, 404));
  }
  console.log(name);
  const task = await Task.create({ name });
  res.status(201).json(task);
};
const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.json({ task });
};
const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(200).send({ msg: "success" });
};

const deteleAll = async (req, res) => {
  const task = await Task.deleteMany({});
  res.status(200).send(task);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  deteleAll,
};
