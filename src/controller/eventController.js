const Event = require("../model/Event.model");
const { handelValidationErrors } = require("../utils/helper.util");

module.exports.getAllOrOne = async (req, res, next) => {
  try {
    // check param id sent
    if (req.params.id) {
      const event = await Event.findById(req.params.id);
      res.json(event);
    } else {
      const events = await Event.find();
      res.json(events);
    }
  } catch (err) {
    next("error find");
  }
};

module.exports.createEvent = async (req, res, next) => {
  // TODO:
  handelValidationErrors(req, res, next);

  const { title, eventDate, mainSpeaker, speakers, students } = req.body;
  const newEvent = new Event({
    title,
    eventDate,
    mainSpeaker,
    speakers,
    students,
  });

  const data = await newEvent.save();
  res.json({ msg: "added", data });
};

module.exports.updateEvent = async (req, res, next) => {
  handelValidationErrors(req, res, next);

  const {
    _id,
    newData: { title, date, mainSpeaker, speakers, students },
  } = req.body;

  try {
    const event = await Event.findById(_id);

    if (!event) res.json({ msg: "no such event" });

    event.title = title || event.title;
    event.date = date || event.date;
    event.mainSpeaker = mainSpeaker || event.mainSpeaker;
    event.speakers = speakers || event.speakers;
    event.students = students || event.students;

    const data = await event.save();

    res.json({ msg: "updated", data });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteEvent = async (req, res, next) => {
  handelValidationErrors(req, res, next);

  const { _id } = req.body;
  try {
    const data = await Event.deleteOne({ _id: _id });
    res.send({ msg: "deleted", data });
  } catch (err) {
    next(err.message);
  }
};
