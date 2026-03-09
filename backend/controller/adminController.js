const userModel = require("../model/userModel")


exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) return res.status(400).send("System is Empty");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Server error",
      error: error.message,
    });
  }
};