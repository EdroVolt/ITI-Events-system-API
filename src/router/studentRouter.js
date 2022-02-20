const express = require("express");
const {
  getAllOrOne,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/studentController");
const { checkRole } = require("../middlewares/auth.mw");
const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../service/student.service");

const studentRouter = express.Router();

studentRouter
  .route("/students/:id?")
  .get(getAllOrOne)
  .post(checkRole(["Admin"]), validatePostData(), createStudent)
  .put(checkRole(["Admin", "Student"]), validatePutData(), updateStudent)
  .delete(checkRole(["Admin"]), validateDeleteData(), deleteStudent);

module.exports = studentRouter;
