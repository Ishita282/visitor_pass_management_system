const passModel = require("../model/passModel");
const appointmentModel = require("../model/appointmentModel");
const notification = require("./notificationController");
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");

exports.generateBadge = async (req, res) => {
  try {

    const appointment = await appointmentModel
      .findById(req.params.appointmentId)
      .populate("visitor")
      .populate("host");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const visitor = appointment.visitor;

    const qrCode = await QRCode.toDataURL(visitor._id.toString());

    const pass = new passModel({
      appointment: appointment._id,
      visitor: visitor._id,
      qrCode: qrCode,
    });

    await pass.save();

    await notification.passGenerated(
      visitor.email,
      visitor.name,
      pass._id
    );

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=visitor-pass.pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("Visitor Pass", { align: "center" });

    doc.moveDown();

    if (visitor.photo) {
      doc.image(visitor.photo, {
        fit: [100, 100],
        align: "center",
      });
    }

    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Name: ${visitor.name}`);
    doc.text(`Email: ${visitor.email}`);
    doc.text(`Phone: ${visitor.phone}`);
    doc.text(`Host: ${appointment.host.name}`);

    doc.moveDown();

    const qrImage = qrCode.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrImage, "base64");

    doc.image(qrBuffer, {
      fit: [120, 120],
      align: "center",
    });

    doc.end();

  } catch (err) {
    console.error("Error in generating badge:", err.message);
    res.status(500).json({
      msg: "Failed to generating badge",
      error: err.message,
    });
  }
};