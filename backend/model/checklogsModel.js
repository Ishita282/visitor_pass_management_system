const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checkLogSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true,
  },

  pass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pass",
    required: true,
  },

  checkInTime: {
    type: Date,
  },

  checkOutTime: {
    type: Date,
  },

  scannedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
});

module.exports = mongoose.model("CheckLog", checkLogSchema);
