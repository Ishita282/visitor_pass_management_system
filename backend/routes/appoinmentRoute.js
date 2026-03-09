const express = require("express");
const router = express.Router();
const {
  createAppoinment,
  getAllAppoinment,
  updateAppoinmentStatusById,
} = require("../controller/appoinmentController");
const { auth, permit } = require("../middleware/authMiddleware");

/*
Route: /appoinment
Method: POST
Description: Create appoinment
Access: admin, employee
Parameter: none
*/

router.post("/", auth, permit("admin", "employee"), createAppoinment);

/*
Route: /appoinment
Method: GET
Description: Get all appoinment
Access: admin, security
Parameter: none
*/

router.get("/", auth, permit("admin", "security"), getAllAppoinment);

/*
Route: /appoinment/{id}/status
Method: PATCH
Description: Update the status of the appoinment
Access: admin
Parameter: id
*/

router.patch("/:id/status", auth, permit("admin"), updateAppoinmentStatusById);

module.exports = router;
