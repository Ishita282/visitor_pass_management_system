const express = require("express");
const router = express.Router();
const { generateBadge } = require("../controller/passController");
const { param } = require("express-validator");
const { validate } = require("../middleware/validator");
const { auth, permit } = require("../middleware/authMiddleware");
router.use(express.json());

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
  generateBadge
);

module.exports = router;
