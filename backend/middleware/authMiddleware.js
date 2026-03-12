const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.header("x-auth-token");
  if (!authHeader)
    return res.status(401).json({
      msg: "No Token, authorization denied",
    });

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : authHeader;

  const jwt_secret = process.env.JWT_TOKEN;
  
  if (!process.env.JWT_TOKEN) {
    throw new Error("JWT_TOKEN is not defined in .env!");
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token is not valid",
      error: error.message,
    });
  }
};

exports.permit = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: "User is unauthorized" });
    } else if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ msg: "Access denied" });
    }
  };
};
