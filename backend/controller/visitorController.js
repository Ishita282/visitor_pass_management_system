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
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      success: false,
      msg: `id: ${id} doesn't present`,
    });
  }

  try {
    const visitor = await visitorModel.findById(id);
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

exports.updateVisitorsById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      msg: `Visitor id is required`,
    });
  }

  try {
    const updatedVisitor = await visitorModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedVisitor) {
      return res.status(404).json({
        success: false,
        msg: `Visitor not found with id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      msg: "Visitor updated successfully",
      visitor: updatedVisitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message,
    });
  }
};

exports.deleteVisitorsById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      msg: "Visitor id is required",
    });
  }

  try {
    const deletedVisitor = await visitorModel.findByIdAndDelete(id);

    if (!deletedVisitor) {
      return res.status(404).json({
        success: false,
        msg: `Visitor not found with id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      msg: "Visitor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message,
    });
  }
};
