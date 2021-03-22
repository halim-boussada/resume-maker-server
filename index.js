const express = require("express");
const path = require("path");
var cors = require("cors");

const app = express();
var bodyParser = require("body-parser");
const multer = require("multer");
const Admin = require("./database/admin.js");
app.use(cors());

const upload = multer({ dest: "uploads" });
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "whah",
  api_key: "967934588341829",
  api_secret: "5tGQ-PeH3P4psCWHmTkZfzbsEsc",
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Serve only the static files form the dist directory

app.post("/upload", upload.any(0), (req, res) => {
  let image = req.files[0].path;
  console.log("REQ========> ", req.files[0].path);

  try {
    cloudinary.uploader.upload(image, (error, result) => {
      error && res.send({ status: false, msg: error });
      res.send({ status: true, msg: result });
    });
  } catch (err) {
    res.send({ status: false, msg: err });
  }
});

app.post("/api/admin", (req, res) => {
  try {
    var obj = {
      name: req.body.name,
      password: req.body.password,
      imageUrl: req.body.imageUrl,
    };
    const newM = new Admin(obj);
    newM.save((err, result) => {
      res.send("dzadazda");
    });
  } catch {
    res.send({ status: false, msg: err });
  }
});
app.get("/", function (req, res) {
  res.send("hello woeld");
});
app.get("/api/admin/:pw", function (req, res) {
  try {
    Admin.find({}, function (error, result) {
      if (error) console.log("this is error ====>", error);
      res.send(result);
    });
  } catch {
    res.send({ status: false, msg: err });
  }
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
