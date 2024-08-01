const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const { addPayment, updatePayment } = require("../Controllers/paymentController");

router.post("/create", auth, addPayment);
router.put("/update/:id", auth, updatePayment);

module.exports = router;
