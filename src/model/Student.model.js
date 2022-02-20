const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
  _id: { type: Number },
  fullname: String,
  email: String,
  password: String,
});

schema.plugin(AutoIncrement, { inc_field: "_id" });
const Student = mongoose.model("students", schema);

module.exports = Student;
