const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const { addFabric, updateFabric } = require("../Controllers/fabricController");

router.post("/create", auth, authorizeRole("admin"), addFabric);
router.put("/update/:id", auth, authorizeRole("admin"), updateFabric);

module.exports = router;
