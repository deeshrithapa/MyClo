const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const { addDiscount, updateDiscount } = require("../Controllers/discountController");

router.post("/create", auth, addDiscount);
router.put("/update/:id", auth, updateDiscount);

module.exports = router;
