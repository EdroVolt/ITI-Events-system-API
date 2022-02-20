const express = require("express");
const {
  handelLogin,
  handelRegister,
  handelChangePassword,
} = require("../controller/authController");
const {
  validatePostData: speakerValidator,
} = require("../service/speaker.service");
const authRouter = express.Router();

authRouter.post("/login", handelLogin);
authRouter.post("/register", speakerValidator(), handelRegister);
authRouter.post("/changePassword", handelChangePassword);

module.exports = authRouter;
