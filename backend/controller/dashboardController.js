const checklogsModel = require("../model/checklogsModel");
const appointmentModel = require("../model/appointmentModel");

exports.dashboardStats = async (req, res) => {
  try {
    const today = new Date();
    const totalVisitors = await checklogsModel.countDocuments({
      checkInTime: today,
    });
    const activeVisitors = await checklogsModel.countDocuments({
      checkOutTime: null,
    });
    const checkedOut = await checklogsModel.countDocuments({
      checkOutTime: null,
    });
    const pendingAppointments = await appointmentModel.countDocuments({
      status: "pending",
    });
    res.status(200).json({
      totalVisitors,
      activeVisitors,
      checkedOut,
      pendingAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
