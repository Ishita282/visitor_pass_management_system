const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_TOKEN;

exports.auth = (req, res, next) => {

  const header = req.headers["x-auth-token"];

  if (!header) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = header.startsWith("Bearer ")
    ? header.slice(7).trim()
    : header;

  try {

    const decoded = jwt.verify(token, jwt_secret);

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token",
    });

  }
};

exports.permit = (...roles) => {

  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();

  };

};