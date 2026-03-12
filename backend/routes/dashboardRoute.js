const express = require("express");
const {
  dashboardStats,
  searchLogs,
  exportLogs,
} = require("../controller/dashboardController");
const { auth, permit } = require("../middleware/authMiddleware");
const { body, param } = require("express-validator");
const { validate } = require("../middleware/validator");

const router = express();
router.use(express.json());

/*
Route: /dashboard/stats
Method: GET
Description: Dashboard stats only admin
Access: Admin
Parameter: none
*/

router.get("/stats", auth, permit("admin"), dashboardStats);

/*
Route: /dashboard/search
Method: GET
Description: Dashboard search only admin
Access: Admin
Parameter: none
*/

router.get("/search", auth, permit("admin"), searchLogs);

/*
Route: /dashboard/export
Method: GET
Description: Dashboard export only admin
Access: Admin
Parameter: none
*/

router.get("/export", auth, permit("admin"), exportLogs);

module.exports = router;
