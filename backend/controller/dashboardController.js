const checklogsModel = require("../model/checklogsModel");
const appoinmentModel = require("../model/appoinmentModel");

exports.dashboardStats = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Visitors checked in today
    const totalVisitors = await checklogsModel.countDocuments({
      checkInTime: { $gte: today },
    });

    // Visitors currently inside building
    const activeVisitors = await checklogsModel.countDocuments({
      checkOutTime: null,
    });

    // Visitors who already checked out
    const checkedOut = await checklogsModel.countDocuments({
      checkOutTime: { $ne: null },
    });

    // Pending appointments
    const pendingAppointments = await appoinmentModel.countDocuments({
      status: "pending",
    });

    res.status(200).json({
      success: true,
      totalVisitors,
      activeVisitors,
      checkedOut,
      pendingAppointments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });

  }
};