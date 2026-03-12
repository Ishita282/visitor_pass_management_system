const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwt_secret = process.env.JWT_TOKEN;

exports.signup = async (req, res) => {

  const { name, email, password, role } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        success: false,
        msg: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || "visitor",
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      jwt_secret,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      token,
      user: { id: newUser._id, name, email, role: role || "visitor" },
    });
  } catch (err) {
    console.error("Error in signup:", err.message);
    res.status(500).json({
      msg: "Failed to signup",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
 
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        msg: "Invalid credentials",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        msg: "Invalid credentials",
      });

    const token = jwt.sign({ id: user._id, role: user.role }, jwt_secret, {
      expiresIn: "1d",
    });

    res.json({
      token,
      success: true,
      user: { id: user._id, name: user.name, email, role: user.role },
    });
  } catch (err) {
    console.error("Error in login:", err.message);
    res.status(500).json({
      msg: "Failed to login",
      error: err.message,
    });
  }
};


