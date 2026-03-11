const visitorModel = require("../model/visitorModel");

exports.createVisitor = async (req, res) => {
  try {
    const { name, email, phone, photo, host, purpose } = req.body;
    if (!name || !email || !phone || !host)
      return res.status(400).json({
        message: "Provide all the fields",
      });

    let existingOne = await visitorModel.findOne({ email });
    if (existingOne)
      return res.status(400).json({ msg: "User already exists" });

    const visitor = new visitorModel({
      name,
      email,
      phone,
      photo,
      host,
      purpose,
    });

    await visitor.save();

    res.status(201).json({
      message: "Visitor registered successfully",
      visitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message,
    });
  }
};

exports.getAllVisitors = async (req, res) => {
  try {
    const allVisitors = await visitorModel
      .find()
      .populate("host", "name email");
    if (allVisitors.length === 0 || !allVisitors)
      return res.status(400).json({
        msg: "Empty: No visitor in the system",
      });

    res.status(200).json({
      success: true,
      visitors: allVisitors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message,
    });
  }
};

exports.getVisitorsById = async (req, res) => {
  const { _id } = req._id;
  if (!_id) {
    res.status(400).json({
      success: false,
      msg: `id: ${id} doesn't present`,
    });
  }

  try {
    const visitor = await visitorModel.findById(_id);
    if (!visitor)
      return res.status(400).json({
        msg: `Visitor doesn't present with id: ${id}`,
      });

    res.status(200).json({
      success: true,
      visitor: visitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message,
    });
  }
};

// exports.updateVisitorsById = async (req, res) => {
// };

// exports.deleteVisitorsById = async (req, res) => {
// };
