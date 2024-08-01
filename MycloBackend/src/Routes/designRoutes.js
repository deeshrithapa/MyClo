const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const { addDesign, updateDesign } = require("../Controllers/designController");

router.post("/create", auth, authorizeRole("admin"), addDesign);
router.put("/update/:id", auth, authorizeRole("admin"), updateDesign);

module.exports = router;
