const checklogsModel = require("../model/checklogsModel");
const generateOTP = require("../config/otp");
const sendSMS = require("../notification/sendSMS");

exports.checkIn = async (req, res) => {
  try {
    const { passId } = req.params;
    const { otp } = req.body;

    const log = await checklogsModel.findById(passId).populate("visitor");
    if (!log) return res.status(404).json({ msg: "Check log not found" });

    if (!otp || log.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (log.otpExpires < new Date()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    log.checkInTime = new Date();
    log.otp = null;
    log.otpExpires = null;
    await log.save();

    res.json({ msg: "Visitor checked in successfully" });
  } catch (err) {
    console.error("Error in check in:", err.message);
    res.status(500).json({
      msg: "Failed to check in",
      error: err.message,
    });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const log = await checklogsModel.findOne({
      pass: req.params.passId,
      checkOutTime: null,
    });

    if (!log) return res.status(404).json({ msg: "Check-in record not found" });

    log.checkOutTime = new Date();

    await log.save();

    res.json({
      message: "Visitor checked out",
      log,
    });
  } catch (err) {
    console.error("Error in check out:", err.message);
    res.status(500).json({
      msg: "Failed to check out",
      error: err.message,
    });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { passId } = req.params;

    const log = await checklogsModel.findById(passId).populate("visitor");
    if (!log) return res.status(404).json({ msg: "Check log not found" });

    const otp = generateOTP();
    log.otp = otp;
    log.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await log.save();

    await sendSMS(log.visitor.phone, `Your check-in OTP is ${otp}`);

    res.json({ msg: "OTP sent to visitor phone" });
  } catch (err) {
    console.error("Error in sending OTP:", err.message);
    res.status(500).json({
      msg: "Failed to send OTP",
      error: err.message,
    });
  }
};

