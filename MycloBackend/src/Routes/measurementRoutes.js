const express = require('express');
const router = express.Router();
const auth = require('../Middleware/authMiddleware');
const authorizeRole = require('../Middleware/authorizationMiddleware');
const {
  addMeasurement,
  updateMeasurement,
  getMeasurements,
  getMeasurementById
} = require('../Controllers/measurementController');

router.post('/create', auth, authorizeRole('user'), addMeasurement);
router.put('/update/:id', auth, authorizeRole('user'), updateMeasurement);
router.get('/', getMeasurements);
router.get('/:id', getMeasurementById);

module.exports = router;
