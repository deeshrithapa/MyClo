const express = require('express');
const createUser = require('../Controllers/userController');
const router = express.Router();

// Route to create user
router.post('/createUser', createUser);

module.exports = router;
