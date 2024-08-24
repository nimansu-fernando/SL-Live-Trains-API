const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location-controller');

router.post('/location', locationController.postLocationData);
router.get('/locations', locationController.getAllLocations);

module.exports = router;
