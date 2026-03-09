const express = require("express");
const router = express.Router();
const { checkIn, checkOut } = require("../controller/checklogsController");
const { auth, permit } = require("../middleware/authMiddleware");

/*
Route: /checklogs/checkin/{passId}
Method: POST
Description: Get all the check-in logs
Access: security, admin
Parameter: passId
*/

router.post("/checkin/:passId", auth, permit("security", "admin"), checkIn);

/*
Route: /checklogs/checkout/{passId}
Method: POST
Description: Get all the check-out logs
Access: security, admin
Parameter: passId
*/

router.post("/checkout/:passId", auth, permit("security", "admin"), checkOut);

module.exports = router;
