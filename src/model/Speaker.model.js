const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: String,
  password: String,
  fullname: String,
  role: {
    type: String,
    enum: ["Student", "Instructor"],
    required: true,
  },
  image: String,
  address: {
    city: { type: String },
    street: { type: String },
    building: { type: String },
  },
});

const Speaker = mongoose.model("speakers", schema);

module.exports = Speaker;
