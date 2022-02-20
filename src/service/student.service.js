const { body } = require("express-validator");
const Student = require("../model/Student.model");

module.exports.validatePostData = () => {
  return [
    body("fullname")
      .isString()
      .withMessage("name is required and must be string"),
    body("password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("email")
      .isEmail()
      .custom((value) => {
        return Student.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      })
      .withMessage("please enter valid email"),
  ];
};

module.exports.validatePutData = () => {
  return [
    body("_id").isNumeric().withMessage("id must be a number"),
    body("newData.fullname")
      .isString()
      .withMessage("name is required and must be string"),
    body("newData.password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("newData.email")
      .custom((value) => {
        return Student.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      })
      .isEmail()
      .withMessage("email must be a valid"),
  ];
};

module.exports.validateDeleteData = () => {
  return body("_id").isNumeric().withMessage("id is not a number");
};
