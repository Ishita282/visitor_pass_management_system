const express = require("express");
const {
  signup,
  login
} = require("../controller/authController");
const { body } = require("express-validator");
const { validate } = require("../middleware/validator");

const router = express.Router();
router.use(express.json());

/*
Route: /register/signup
Method: POST
Description: Signup the User
Access: Public
Parameter: none
*/

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    body("role").optional().isIn(["visitor", "admin", "security", "employee"]),
  ],
  validate,
  signup
);

/*
Route: /register/login
Method: POST
Description: Login the User
Access: Public
Parameter: none
*/

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").exists(),
  ],
  validate,
  login,
);

module.exports = router;
