const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location-controller');

router.post('/', locationController.postLocationData);
router.get('/data', locationController.getAllLocations);

module.exports = router;
