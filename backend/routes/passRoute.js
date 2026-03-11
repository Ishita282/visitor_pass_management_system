const express = require("express");
const router = express.Router();
const { qrPassGenerator } = require("../controller/passController");
const { auth, permit } = require("../middleware/authMiddleware");

/*
Route: /pass/generate/{appointmentId}
Method: POST
Description: Generate QR pass for appoinment
Access: admin, security
Parameter: appointmentId
*/

router.post(
  "/generate/:appointmentId",
  auth,
  permit("admin", "security"),
  qrPassGenerator,
);

module.exports = router;
