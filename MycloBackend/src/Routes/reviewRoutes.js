const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const { addReview, updateReview } = require("../Controllers/reviewController");

router.post("/create", auth, addReview);
router.put("/update/:id", auth, updateReview);

module.exports = router;
