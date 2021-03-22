const mongoose = require("mongoose");
const db = require("./connect.js");
mongoose.Promise = global.Promise;

const AdminSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    imageUrl: String,
    type: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("User", AdminSchema);

module.exports = Admin;
