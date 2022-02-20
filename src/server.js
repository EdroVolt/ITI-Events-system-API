const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require("./router/authRouter");
const speakerRouter = require("./router/speakerRouter");
const studentRouter = require("./router/studentRouter");
const eventRouter = require("./router/eventRouter");
const uploader = require("./middlewares/fileUpload.mw");
const { isAuth } = require("./middlewares/auth.mw");

// -------- instantiate server -----------------------
const app = express();
mongoose.connect(process.env.DB_URL, () => {
  console.log("DB connected");
  app.listen(process.env.PORT, () =>
    console.log(`server is running on port:${process.env.PORT}`)
  );
});

// -------- static file served  -----------------------------
app.use("/images", express.static(path.join(__dirname, "images")));

// -------- middelWares -----------------------------
app.use(uploader.single("image"));
app.use(morgan("dev"));
app.use(cors("*"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// -------- Routers ----------------------------------
app.use(authRouter);
app.use(isAuth, speakerRouter);
app.use(studentRouter);
app.use(eventRouter);

// Not Found route
app.use((req, res) => {
  res.status(404).json({ error: "NOT FOUND!!" });
});

// ------- ErrorMiddelWare ----------------------------
app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({ mesg: error.message });
});
