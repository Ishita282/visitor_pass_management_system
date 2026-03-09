const express = require("express");
const {
  dashboardStats
} = require("../controller/authController");
const { auth, permit } = require("../middleware/authMiddleware");

const router = express();
router.use(express.json());

const { auth, permit } = require("../middleware/auth");

/*
Route: /dashboard/stats
Method: GET
Description: Dashboard stats only admin
Access: Admin
Parameter: none
*/

router.get(
  "/stats",
  auth,
  permit("admin"),
  dashboardStats
);

module.exports = router;
