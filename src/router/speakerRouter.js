const express = require("express");
const {
  getAllOrOne,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
} = require("../controller/speakerController");
const { checkRole } = require("../middlewares/auth.mw");
const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../service/speaker.service");

const speakerRouter = express.Router();

speakerRouter
  .route("/speakers/:id?")
  .get(getAllOrOne)
  .post(checkRole(["Admin", "Speaker"]), validatePostData(), createSpeaker)
  .put(checkRole(["Admin", "Speaker"]), validatePutData(), updateSpeaker)
  .delete(checkRole(["Admin"]), validateDeleteData(), deleteSpeaker);

module.exports = speakerRouter;
