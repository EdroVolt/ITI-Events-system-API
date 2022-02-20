const express = require("express");
const {
  getAllOrOne,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController");
const { checkRole } = require("../middlewares/auth.mw");
const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../service/event.service");

const eventRouter = express.Router();

eventRouter
  .route("/events/:id?")
  .get(getAllOrOne)
  .post(checkRole(["Admin"]), validatePostData(), createEvent)
  .put(checkRole(["Admin"]), validatePutData(), updateEvent)
  .delete(checkRole(["Admin"]), validateDeleteData(), deleteEvent);

module.exports = eventRouter;
