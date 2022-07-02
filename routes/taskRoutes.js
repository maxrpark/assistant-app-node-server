const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  deteleAll,
} = require("../controlers/taskControllers");
const router = express.Router();

router.route("/").get(getAllTasks).post(createTask).delete(deteleAll);
router.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = router;
