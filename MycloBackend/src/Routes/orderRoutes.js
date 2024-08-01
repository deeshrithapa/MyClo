const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const { addOrder, updateOrder } = require("../Controllers/orderController");

router.post("/create", auth, addOrder);
router.put("/update/:id", auth, updateOrder);

module.exports = router;
