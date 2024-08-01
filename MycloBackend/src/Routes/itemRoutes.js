const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const { addItem, updateItem } = require("../Controllers/itemController");

router.post("/create", auth, addItem);
router.put("/update/:id", auth, updateItem);

module.exports = router;
