const express = require('express');
const router = express.Router();
const tripStationController = require('../controllers/trip-station-controller');

router.get('/', tripStationController.getAllTripStations);
router.get('/:id', tripStationController.getTripStationById);
router.post('/', tripStationController.createTripStation);
router.put('/:id', tripStationController.updateTripStation);
router.delete('/:id', tripStationController.deleteTripStation);
router.get('/stations/:trip_id', tripStationController.getStationsByTripId);


module.exports = router;
