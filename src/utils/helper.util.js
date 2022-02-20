const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.handelValidationErrors = (req, res, next) => {
  // check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    {
      error = new Error(" ");
      error.status = 422;
      error.message = errors.array();
      // .reduce((current, object) => current + object.msg + ", ", "");
      next(error);
    }
  }
};

module.exports.encryptPassword = (PlaintextPassword) => {
  return bcrypt.hashSync(PlaintextPassword, saltRounds);
};

module.exports.isRegisterd = async (collection, email, password) => {
  doc = await collection.findOne({ email: email }).exec();
  if (!doc) return false;
  return bcrypt.compareSync(password, doc.password);
};
