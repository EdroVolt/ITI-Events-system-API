const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("title").isString().withMessage("title is required and must be alpha"),
    body("date").isDate().withMessage("eventDate must be date formate "),
    body("mainSpeaker").isNumeric().withMessage("please enter main speaker"),
    body("speakers").isArray().withMessage("please enter array of speakers"),
    body("students").isArray().withMessage("please enter array of students"),
  ];
};

module.exports.validatePutData = () => {
  return [
    body("_id").isNumeric().withMessage("id must be a number"),
    body("newData.title")
      .isString()
      .withMessage("title is required and must be alpha"),
    body("newData.mainSpeaker")
      .isAlpha()
      .withMessage("please enter main speaker"),
    body("newData.speakers")
      .isArray()
      .withMessage("please enter array of speakers"),
    body("newData.students")
      .isArray()
      .withMessage("please enter array of students"),
  ];
};

module.exports.validateDeleteData = () => {
  return body("_id").isAlphanumeric().withMessage("id is not a number");
};
