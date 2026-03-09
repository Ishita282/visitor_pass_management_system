const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passSchema = new Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
    },

    qrCode: {
      type: String,
    },

    issuedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pass", passSchema);
