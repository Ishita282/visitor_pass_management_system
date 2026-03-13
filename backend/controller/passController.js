const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const passModel = require("../model/passModel");
const appointmentModel = require("../model/appointmentModel");
const notification = require("./notificationController");

exports.generateBadge = async (req, res) => {
  try {
    const appointment = await appointmentModel
      .findById(req.params.appointmentId)
      .populate("visitor", "name email phone")
      .populate("host", "name"); 

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const visitor = appointment.visitor;
    const qrCodeDataURL = await QRCode.toDataURL(visitor._id.toString());
    const pass = new passModel({
      appointment: appointment._id,
      visitor: visitor._id,
      qrCode: qrCodeDataURL,
    });
    await pass.save();
    await notification.passGenerated(
      visitor.email,
      visitor.phone,
      visitor.name,
      pass._id,
      qrCodeDataURL
    );
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);
    doc.fontSize(20).text("Visitor Pass");
    doc.moveDown();
    doc.text(`Name: ${visitor.name}`);
    doc.text(`Email: ${visitor.email}`);
    doc.text(`Phone: ${visitor.phone}`);
    doc.text(`Host: ${appointment.host?.name || "Not assigned"}`);
    doc.text(`Pass ID: ${pass._id}`);
    doc.moveDown();

    const qrBase64 = qrCodeDataURL.split(",")[1];
    const qrBuffer = Buffer.from(qrBase64, "base64");
    doc.image(qrBuffer, { width: 120 });

    doc.end();
  } catch (err) {
    console.log("Error generating badge:", err);
    res.status(500).json({ message: "Server error" });
  }
};