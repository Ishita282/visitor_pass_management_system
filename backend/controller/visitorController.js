const visitorModel = require("../model/visitorModel");

exports.createVisitor = async (req, res) => {
  try {
    const { name, email, phone, photo, host, purpose } = req.body;

    if (!name || !email || !phone || !host) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingVisitor = await visitorModel.findOne({ email });

    if (existingVisitor) {
      return res.status(400).json({
        success: false,
        message: "Visitor already exists",
      });
    }

    const visitor = await visitorModel.create({
      name,
      email,
      phone,
      photo,
      host,
      purpose,
    });

    res.status(201).json({
      success: true,
      message: "Visitor registered successfully",
      visitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await visitorModel
      .find()
      .populate("host", "name email");

    res.status(200).json({
      success: true,
      visitors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getVisitorsById = async (req, res) => {
  try {
    const { id } = req.params;

    const visitor = await visitorModel.findById(id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    res.status(200).json({
      success: true,
      visitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};