const appointmentModel = require("../model/appointmentModel");
const visitorModel = require("../model/visitorModel");
const notification = require("./notificationController");

exports.createAppointment = async (req, res) => {
  try {
    const { visitorId, hostId, date } = req.body;

    const visitor = await visitorModel.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    const newAppointment = new appointmentModel({
      visitor: visitorId,
      host: hostId,
      date: date,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate("visitor", "name")
      .populate("host", "name");
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateAppointmentStatusById = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await appointmentModel.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = status;
    await appointment.save();
    if (status === "approved") {
      await notification.appointmentApproved(appointment.visitor.email);
    }
    if (status === "rejected") {
      await notification.appointmentRejected(appointment.visitor.email);
    }
    res.status(200).json({
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
