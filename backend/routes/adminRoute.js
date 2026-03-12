const express = require("express");
const { getAllUsers } = require("../controller/adminController");
const { auth, permit } = require("../middleware/authMiddleware");
const { body, param } = require("express-validator");
const { validate } = require("../middleware/validator");

const router = express();
router.use(express.json());

/*
Route: /users
Method: GET
Description: All the users present in the system
Access: Admin
Parameter: none
*/

router.get("/all", auth, permit("admin"), getAllUsers);

module.exports = router;
