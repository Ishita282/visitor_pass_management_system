const checklogsModel = require("../model/checklogsModel");
const generateOTP = require("../config/otp");
const sendSMS = require("../notification/sendSMS");

exports.sendOTP = async (req, res) => {
  try {
    const { passId } = req.params;

    const log = await checklogsModel.findById(passId);
    if (!log) {
      return res.status(404).json({ message: "Check log not found" });
    }
    const otp = generateOTP();
    log.otp = otp;
    log.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await log.save();
    await sendSMS(log.visitor.phone, `Your check-in OTP is ${otp}`);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.checkIn = async (req, res) => {
  try {
    const { passId } = req.params;
    const { otp } = req.body;
    const log = await checklogsModel.findById(passId);
    if (!log) {
      return res.status(404).json({ message: "Check log not found" });
    }
    if (log.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (log.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    log.checkInTime = new Date();
    log.otp = null;
    log.otpExpires = null;
    await log.save();
    res.status(200).json({
      success: true,
      message: "Visitor checked in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { passId } = req.params;
    const log = await checklogsModel.findOne({
      pass: passId,
      checkOutTime: null,
    });
    if (!log) {
      return res.status(404).json({ message: "Check-in record not found" });
    }
    log.checkOutTime = new Date();
    await log.save();
    res.status(200).json({
      success: true,
      message: "Visitor checked out successfully",
      log,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
