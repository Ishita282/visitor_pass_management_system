const CheckLog = require("../models/CheckLog");
const Pass = require("../models/Pass");


exports.checkIn = async (req, res) => {
    try {

      const pass = await Pass.findById(req.params.passId);

      if (!pass)
        return res.status(404).json({ msg: "Pass not found" });

      const log = new CheckLog({
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
      res.status(500).json({ msg: "Server error" });
    }
  }


exports.checkOut = async (req, res) => {
    try {

      const log = await CheckLog.findOne({
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
      res.status(500).json({ msg: "Server error" });
    }
  }