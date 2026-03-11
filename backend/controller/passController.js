const passModel = require("../model/passModel");
const appoinmentModel = require("../model/appoinmentModel");
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");


exports.qrPassGenerator = async (req, res) => {
  try {
    const appointment = await appoinmentModel.findById(req.params.appointmentId)
      .populate("visitor")
      .populate("host");

    if (!appointment)
      return res.status(404).json({ msg: "Appointment not found" });

    if (appointment.status !== "approved")
      return res.status(400).json({ msg: "Appointment not approved" });

    // QR DATA
    const qrData = `visitor:${appointment.visitor._id}`;

    const qrCode = await QRCode.toDataURL(qrData);

    const pass = new passModel({
      appointment: appointment._id,
      visitor: appointment.visitor._id,
      qrCode: qrCode,
    });

    await pass.save();

    res.json({
      message: "Pass generated",
      pass,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
