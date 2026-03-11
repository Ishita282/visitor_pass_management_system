const passModel = require("../model/passModel");
const appoinmentModel = require("../model/appoinmentModel");
const QRCode = require("qrcode");

exports.qrPassGenerator = async (req, res) => {
  try {

    const appointment = await appoinmentModel
      .findById(req.params.appointmentId)
      .populate("visitor")
      .populate("host");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Appointment must be approved first",
      });
    }

    const qrData = JSON.stringify({
      visitorId: appointment.visitor._id,
      appointmentId: appointment._id,
    });

    const qrCode = await QRCode.toDataURL(qrData);

    const pass = await passModel.create({
      appointment: appointment._id,
      visitor: appointment.visitor._id,
      qrCode,
    });

    res.status(201).json({
      success: true,
      message: "Pass generated successfully",
      pass,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });

  }
};