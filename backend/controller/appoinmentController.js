const appointmentModel = require("../model/appointmentModel");
const visitorModel = require("../model/visitorModel");
const notification = require("./notificationController");

exports.createAppointment = async (req, res) => {
  try {
    const { visitorId, hostId, date } = req.body;

    const visitor = await visitorModel.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({ msg: "Visitor not found" });
    }

    const appointment = new appointmentModel({
      visitor: visitorId,
      host: hostId,
      date,
    });

    await appointment.save();

    res.status(201).json({
      msg: "Appointment created",
      appointmentId: appointment._id,
      appointment,
    });

  } catch (err) {
      console.error("Error in createVisitor:", err.message);
  res.status(500).json({
    msg: "Failed to create visitor",
    error: err.message
  });
  }
};

exports.getAllAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate("visitor", "name phone email")
      .populate("host", "name email");

    res.json(appointments);

  } catch (err) {
      console.error("Error in createVisitor:", err.message);
  res.status(500).json({
    msg: "Failed to create visitor",
    error: err.message
  });
  }
};

exports.updateAppointmentStatusById = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const appointment = await appointmentModel
      .findById(req.params.id)
      .populate("visitor");

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    if (status === "approved") {
      await notification.appointmentApproved(
        appointment.visitor.email,
        appointment.visitor.name,
        appointment.date
      );
    }

    if (status === "rejected") {
      await notification.appointmentRejected(
        appointment.visitor.email,
        appointment.visitor.name
      );
    }

    res.json({
      msg: `Appointment ${status}`,
      appointment,
    });

  } catch (err) {
      console.error("Error in createVisitor:", err.message);
  res.status(500).json({
    msg: "Failed to create visitor",
    error: err.message
  });
  }
};