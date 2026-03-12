const checklogsModel = require("../model/checklogsModel");
const passModel = require("../model/passModel");


exports.checkIn = async (req, res) => {
    try {

      const pass = await passModel.findById(req.params.passId);

      if (!pass)
        return res.status(404).json({ msg: "Pass not found" });

      const log = new checklogsModel({
        visitor: pass.visitor,
        pass: pass._id,
        checkInTime: new Date(),
        scannedBy: req.user.id
      });

      await log.save();

      res.json({
        message: "Visitor checked in",
        log
      });

    } catch (error) {
        console.error("Error in createVisitor:", err.message);
  res.status(500).json({
    msg: "Failed to create visitor",
    error: err.message
  });
    }
  }


exports.checkOut = async (req, res) => {
    try {

      const log = await checklogsModel.findOne({
        pass: req.params.passId,
        checkOutTime: null
      });

      if (!log)
        return res.status(404).json({ msg: "Check-in record not found" });

      log.checkOutTime = new Date();

      await log.save();

      res.json({
        message: "Visitor checked out",
        log
      });

    } catch (error) {
        console.error("Error in createVisitor:", err.message);
  res.status(500).json({
    msg: "Failed to create visitor",
    error: err.message
  });
    }
  }