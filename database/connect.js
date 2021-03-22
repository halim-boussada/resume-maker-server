const mongoose = require("mongoose");

const db = mongoose.connect(
  "mongodb+srv://halim1:BWCGfxX95S3behv@cluster0.ivykj.mongodb.net/resume?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = db;
