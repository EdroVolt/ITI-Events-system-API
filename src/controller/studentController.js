const Student = require("../model/Student.model");
const {
  handelValidationErrors,
  encryptPassword,
} = require("../utils/helper.util");

module.exports.getAllOrOne = async (req, res, next) => {
  try {
    // check param id sent
    if (req.params.id) {
      const student = await Student.findById(req.params.id);
      res.json(student);
    } else {
      const students = await Student.find();
      res.json(students);
    }
  } catch (err) {
    next("error find");
  }
};

module.exports.createStudent = async (req, res, next) => {
  handelValidationErrors(req, res, next);

  let { fullname, password, email } = req.body;

  password = encryptPassword(password);
  let newStudent = new Student({
    fullname,
    password,
    email,
  });
  const data = await newStudent.save();
  res.json({ msg: "added", data });
};

module.exports.updateStudent = async (req, res, next) => {
  handelValidationErrors(req, res, next);

  const {
    _id,
    newData: { fullname, password, email },
  } = req.body;

  try {
    const student = await Student.findById(_id);
    if (!student) res.json({ msg: "no such student" });

    password = encryptPassword(password);

    student.fullname = fullname || student.fullname;
    student.password = password || student.password;
    student.email = email || student.email;

    const data = await student.save();

    res.json({ msg: "updated", data });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteStudent = async (req, res, next) => {
  handelValidationErrors(req, res, next);

  const { _id } = req.body;
  try {
    const data = await Student.deleteOne({ _id: _id });
    res.send({ msg: "deleted", data });
  } catch (err) {
    next(err.message);
  }
};
