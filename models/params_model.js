const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let params = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    ph: {
      type: Number,
    },
    ammonia: {
      type: Number,
    },
    nitrite: {
        type: Number,
    },
    nitrate: {
        type: Number,
    },
    temperature: {
        type: Number,
    },
    water_change: {
        type: Date,
    },
    user :{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user',
      required: true
  }
  },
  { collection: "Parameters" },
  { timestamps: true }
);

module.exports = mongoose.model("params", params);