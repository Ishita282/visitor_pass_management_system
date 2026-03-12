const express = require("express");
const router = express.Router();
const { qrPassGenerator } = require("../controller/passController");
const { body, param } = require("express-validator");
const { validate } = require("../middleware/validator");
const { auth, permit } = require("../middleware/authMiddleware");

/*
Route: /pass/generate/{appointmentId}
Method: POST
Description: Generate QR pass for appointment
Access: admin, security
Parameter: appointmentId
*/

router.post(
  "/generate/:appointmentId",
  auth,
  permit("admin", "security"),
  [
    param("appointmentId").notEmpty().withMessage("Appointment ID required"),
  ],
  validate,
  qrPassGenerator
);

module.exports = router;
