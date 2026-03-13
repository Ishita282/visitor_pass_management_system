const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  updateAppointmentStatusById,
} = require("../controller/appointmentController");
const { auth, permit } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const { validate } = require("../middleware/validator");
router.use(express.json());

/*
Route: /appointment
Method: POST
Description: Create appointment
Access: admin, employee
Parameter: none
*/

router.post(
  "/",
  auth,
  permit("admin", "employee"),
  [
    body("visitorId").notEmpty().withMessage("Visitor ID required"),
    body("hostId").notEmpty().withMessage("Host ID required"),
    body("date").notEmpty().withMessage("Date required"),
  ],
  validate,
  createAppointment
);

/*
Route: /appointment
Method: GET
Description: Get all appointment
Access: admin, security
Parameter: none
*/

router.get("/", auth, permit("admin", "security"), getAllAppointments);

/*
Route: /appointment/{id}/status
Method: PATCH
Description: Update the status of the appointment
Access: admin
Parameter: id
*/

router.patch(
  "/:id/status",
  auth,
  permit("admin"),
  [
    body("status")
      .isIn(["approved", "rejected"])
      .withMessage("Status must be approved or rejected"),
  ],
  validate,
  updateAppointmentStatusById
);

module.exports = router;
