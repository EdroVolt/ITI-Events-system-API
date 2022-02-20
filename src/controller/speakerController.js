const Speaker = require("../model/Speaker.model");
const {
  handelValidationErrors,
  encryptPassword,
} = require("../utils/helper.util");

module.exports.getAllOrOne = async (req, res, next) => {
  // check param id sent
  if (req.params.id) {
    const _id = req.params.id;
    const speaker = await Speaker.findById(req.params.id);
    res.json(speaker);
  } else {
    const speakers = await Speaker.find();
    res.json(speakers);
  }
};

module.exports.createSpeaker = async (req, res, next) => {
  handelValidationErrors(req, res, next);

  let { fullname, password, email, address, role, image } = req.body;
  password = encryptPassword(password);
  let newSpeaker = new Speaker({
    fullname,
    password,
    email,
    address,
    role,
    image,
  });
  const data = await newSpeaker.save();
  res.json({ msg: "added", data });
};

module.exports.updateSpeaker = async (req, res, next) => {
  handelValidationErrors(req, res, next);

  const {
    _id,
    newData: { fullname, password, email, address, role, image },
  } = req.body;

  try {
    const speaker = await Speaker.findById(_id);
    if (!speaker) res.json({ msg: "no such speaker" });

    password = encryptPassword(password);

    speaker.fullname = fullname || speaker.fullname;
    speaker.password = password || speaker.password;
    speaker.email = email || speaker.email;
    speaker.address = address || speaker.address;
    speaker.role = role || speaker.role;
    speaker.image = image || speaker.image;

    const data = await speaker.save();

    res.json({ msg: "updated", data });
  } catch (err) {
    next(err.message);
  }
};

module.exports.deleteSpeaker = async (req, res, next) => {
  handelValidationErrors(req, res, next);

  const { _id } = req.body;
  try {
    const data = await Speaker.deleteOne({ _id: _id });
    res.send({ msg: "deleted", data });
  } catch (err) {
    next(err.message);
  }
};
