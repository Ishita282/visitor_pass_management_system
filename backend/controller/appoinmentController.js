const appoinmentModel = require("../model/appoinmentModel");
const visitorModel = require("../model/visitorModel")

exports.createAppoinment = async (req, res) => {
      try {
        const { visitorId, hostId, date } = req.body;
  
        const visitor = await visitorModel.findById(visitorId);
        if (!visitor) return res.status(404).json({ msg: "Visitor not found" });
  
        const appointment = new appoinmentModel({
          visitor: visitorId,
          host: hostId,
          date,
        });
  
        await appointment.save();
        res.status(201).json({ msg: "Appointment created", appointment });
      } catch (err) {
        res.status(500).json({ msg: "Server error" });
      }
  
};

exports.getAllAppoinment = async (req, res) => {
  try {
    const appointments = await appoinmentModel.find()
      .populate("visitor", "name phone email")
      .populate("host", "name email");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateAppoinmentStatusById = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status))
      return res.status(400).json({ msg: "Invalid status" });

    const appointment = await appoinmentModel.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ msg: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    res.json({ msg: `Appointment ${status}`, appointment });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
