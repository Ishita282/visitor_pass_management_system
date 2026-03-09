const express = require("express");
const {
  createVisitor,
  getAllVisitors,
  getVisitorsById,
  //   updateVisitorsById,
  //   deleteVisitorsById,
} = require("../controller/visitorController");
const { auth, permit } = require("../middleware/authMiddleware");

const router = express();
router.use(express.json());

/*
Route: /visitors/create
Method: POST
Description: CREATE VISITOR
Access: PUBLIC
Parameter: none
*/

router.post("/", createVisitor);

/*
Route: /visitors
Method: GET
Description: GET ALL VISITORS 
Access: ADMIN, SECURITY
Parameter: none
*/

router.get("/", auth, permit("admin", "security"), getAllVisitors);

/*
Route: /visitors/{id}
Method: GET
Description: GET SINGLE VISITOR BY ID
Access: PUBLIC
Parameter: id
*/

router.get("/:id", auth, getVisitorsById);

/*
Route: /visitors/{id}
Method: PUT
Description: UPDATE VISITOR
Access: VISITOR
Parameter: id
*/

// router.put("/:id", updateVisitorsById);

/*
Route: /visitors/{id}
Method: DELETE
Description: DELETE VISITOR
Access: PUBLIC
Parameter: id
*/

// router.delete("/:id", deleteVisitorsById);

module.exports = router;