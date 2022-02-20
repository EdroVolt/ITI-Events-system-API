var jwt = require("jsonwebtoken");

const Speaker = require("../model/Speaker.model");
const Student = require("../model/Student.model");
const {
  handelValidationErrors,
  isRegisterd,
  encryptPassword,
} = require("../utils/helper.util");
const { createSpeaker } = require("./speakerController");
const { createStudent } = require("./studentController");

module.exports.handelLogin = async (req, res, next) => {
  handelValidationErrors(req, res, next);
  console.log(process.env.JWT_SECRET_KEY);

  const { email, password } = req.body;
  if (await isRegisterd(Student, email, password)) {
    //  found in students collection
    let token = jwt.sign(
      {
        email: email,
        role: "Student",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ msg: "welcome student 😃", token });
  } else if (await isRegisterd(Speaker, email, password)) {
    //  found in speakers collection
    let token = jwt.sign(
      {
        email: email,
        role: "Speaker",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ msg: "welcome Speaker 😃", token });
  } else {
    res.json({ msg: "please sign up" });
  }
};

module.exports.handelRegister = (req, res, next) => {
  handelValidationErrors(req, res, next);

  // check type of user
  if (req.body.role == "speaker") {
    // speaker
    createSpeaker(req, res, next);
  } else {
    // student
    createStudent(req, res, next);
  }
};

module.exports.handelChangePassword = async (req, res, next) => {
  let { id, password, role } = req.body;
  let user;
  try {
    if (role === "Speaker") {
      user = await Speaker.findById(id);
    } else if (role === "Student") {
      user = await Student.findById(id);
    } else {
      res.json({ msg: "no such user" });
    }

    password = encryptPassword(password);
    user.password = password || user.password;
    const data = await user.save();

    res.json({ msg: "password changed", data });
  } catch (err) {
    next(err);
  }
};
