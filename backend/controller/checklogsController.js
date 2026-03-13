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
    log.checkInTime = new Date();
    log.otp = null;
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
      pass: passId
    });
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
