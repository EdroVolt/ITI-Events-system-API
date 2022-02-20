const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
  _id: { type: Number, alias: "event_id" },
  title: String,
  date: Date,
  mainSpeaker: { type: mongoose.Types.ObjectId, ref: "speakers" },
  speakers: [{ type: mongoose.Types.ObjectId, ref: "speakers" }],
  students: [{ type: Number, ref: "students" }],
});

schema.plugin(AutoIncrement, { inc_field: "event_id" });
const Event = mongoose.model("events", schema);

module.exports = Event;
