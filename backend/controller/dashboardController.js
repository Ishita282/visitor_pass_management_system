const checklogsModel = require("../model/checklogsModel");
const appoinmentModel = require("../model/appoinmentModel");


exports.dashboardStats = async (req, res) => {
    try {

      const today = new Date();
      today.setHours(0,0,0,0);

      //description: visitors checked in today
      const totalVisitors = await checklogsModel.countDocuments({
        checkInTime: { $gte: today }
      });

      //description: visitors still inside
      const activeVisitors = await checklogsModel.countDocuments({
        checkOutTime: null
      });

      //description: visitors who left
      const checkedOut = await checklogsModel.countDocuments({
        checkOutTime: { $ne: null }
      });

      //description: pending appointments
      const pendingAppointments = await appoinmentModel.countDocuments({
        status: "pending"
      });

      res.json({
        totalVisitors,
        activeVisitors,
        checkedOut,
        pendingAppointments
      });

    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }