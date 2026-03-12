const checklogsModel = require("../model/checklogsModel");
const appointmentModel = require("../model/appointmentModel");
const visitorModel = require("../model/visitorModel");

exports.dashboardStats = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalVisitors = await checklogsModel.countDocuments({
      checkInTime: { $gte: today }
    });

    const activeVisitors = await checklogsModel.countDocuments({
      checkOutTime: null
    });

    const checkedOut = await checklogsModel.countDocuments({
      checkOutTime: { $ne: null }
    });

    const pendingAppointments = await appointmentModel.countDocuments({
      status: "pending"
    });

    res.json({
      totalVisitors,
      activeVisitors,
      checkedOut,
      pendingAppointments
    });

  } catch (err) {
      console.error("Error in dashboard stats:", err.message);
  res.status(500).json({
    msg: "Failed to dashboard stats",
    error: err.message
  });
  }
};



exports.searchLogs = async (req, res) => {
  try {

    const { name, startDate, endDate, status } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.checkInTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (status === "active") {
      filter.checkOutTime = null;
    }

    if (status === "checkedout") {
      filter.checkOutTime = { $ne: null };
    }

    let logs = await checklogsModel
      .find(filter)
      .populate("visitor", "name email phone");

    if (name) {
      logs = logs.filter(log =>
        log.visitor.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    res.json(logs);

  } catch (err) {
      console.error("Error in search logs:", err.message);
  res.status(500).json({
    msg: "Failed to search logs",
    error: err.message
  });
  }
};



exports.exportLogs = async (req, res) => {
  try {

    const logs = await checklogsModel
      .find()
      .populate("visitor", "name email phone");

    const format = req.query.format || "json";

    if (format === "json") {
      return res.json(logs);
    }

    if (format === "csv") {

      let csv = "Name,Email,Phone,CheckIn,CheckOut\n";

      logs.forEach(log => {
        csv += `${log.visitor.name},${log.visitor.email},${log.visitor.phone},${log.checkInTime},${log.checkOutTime}\n`;
      });

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=visitor_logs.csv");

      return res.send(csv);
    }

    res.status(400).json({ msg: "Invalid format" });

  } catch (err) {
      console.error("Error in export logs:", err.message);
  res.status(500).json({
    msg: "Failed to export logs",
    error: err.message
  });
  }
};