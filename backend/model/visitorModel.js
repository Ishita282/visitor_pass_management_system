const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const visitorModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purpose: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Visitor", visitorModel)