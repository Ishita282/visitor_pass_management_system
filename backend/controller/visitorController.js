const visitorModel = require("../model/visitorModel");

exports.createVisitor = async (req, res) => {
  try {
    const { name, email, phone, photo, host, purpose } = req.body;

    if (!name || !email || !phone || !host) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingVisitor = await visitorModel.findOne({ email });
    if (existingVisitor) {
      return res.status(400).json({ message: "Visitor already exists" });
    }

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
      message: "Visitor created successfully",
      visitor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await visitorModel.find();

    res.status(200).json({
      success: true,
      visitors,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getVisitorById = async (req, res) => {
  try {
    const visitor = await visitorModel.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.status(200).json({
      success: true,
      visitor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateVisitorById = async (req, res) => {
  try {
    const visitor = await visitorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Visitor updated successfully",
      visitor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteVisitorById = async (req, res) => {
  try {
    const visitor = await visitorModel.findByIdAndDelete(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Visitor deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
