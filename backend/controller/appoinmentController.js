const appoinmentModel = require("../model/appoinmentModel");
const visitorModel = require("../model/visitorModel");

exports.createAppoinment = async (req, res) => {
  try {
    const { visitorId, hostId, date } = req.body;

    if (!visitorId || !hostId || !date) {
      return res.status(400).json({
        success: false,
        message: "Please provide visitorId, hostId and date",
      });
    }

    const visitor = await visitorModel.findById(visitorId);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    const appointment = await appoinmentModel.create({
      visitor: visitorId,
      host: hostId,
      date,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getAllAppoinment = async (req, res) => {
  try {

    const appointments = await appoinmentModel
      .find()
      .populate("visitor", "name phone email")
      .populate("host", "name email");

    res.status(200).json({
      success: true,
      appointments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateAppoinmentStatusById = async (req, res) => {
  try {

    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected",
      });
    }

    const appointment = await appoinmentModel.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = status;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: `Appointment ${status}`,
      appointment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};