const express = require("express");
const {
  dashboardStats
} = require("../controller/dashboardController");
const { auth, permit } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(express.json());

/*
Route: /dashboard/stats
Method: GET
Description: Dashboard stats only admin
Access: Admin
Parameter: none
*/

router.get("/stats", auth, permit("admin"), dashboardStats);

module.exports = router;
