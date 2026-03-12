const userModel = require("../model/userModel")


exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) return res.status(400).send("System is Empty");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Error in getting users:", err.message);
    res.status(500).json({
      msg: "Failed to getting users",
      error: err.message,
    });
  }

};