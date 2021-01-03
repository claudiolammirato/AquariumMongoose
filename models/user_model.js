const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let users = new Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    params : [
      {type: mongoose.Schema.Types.ObjectId,ref:'params'}
  ]
  },
  { collection: "Users" },
  { timestamps: true }
);

module.exports = mongoose.model("users", users);