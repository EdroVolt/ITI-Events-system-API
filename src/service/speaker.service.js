const { body } = require("express-validator");
const Speaker = require("../model/Speaker.model");

module.exports.validatePostData = () => {
  return [
    body("fullname")
      .isString()
      .withMessage("name is required and must be alpha"),
    body("password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("confirmPassword")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .custom((value, { req }) => {
        if (value === req.body.password) return true;
        return false;
      })
      .withMessage("password min length: 8 "),
    body("role").custom((value) => {
      if (["Student", "Instructor"].includes(value)) {
        return true;
      }
      throw new Error("role must be Instructor or Student");
    }),
    body("email")
      .isEmail()
      .custom((value) => {
        return Speaker.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      })
      .withMessage("please enter valid email"),
    body("address").isObject().withMessage("send address as an object"),
    body("image").isString().withMessage("send your image"),
  ];
};

module.exports.validatePutData = () => {
  return [
    body("_id").isAlphanumeric().withMessage("id must be a number"),
    body("newData.fullname")
      .isString()
      .withMessage("name is required and must be alpha"),
    body("newData.password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("role").custom((value) => {
      if (["Student", "Instructor"].includes(value)) {
        return true;
      }
      throw new Error("role must be Instructor or Student");
    }),
    body("newData.email")
      .isEmail()
      .custom((value) => {
        return Speaker.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      })
      .withMessage("email must be a valid"),
    body("newData.address").isObject().withMessage("address must be an object"),
    body("newData.image").isString().withMessage("image must be string"),
  ];
};

module.exports.validateDeleteData = () => {
  return body("_id").isAlphanumeric().withMessage("id is not a number");
};
