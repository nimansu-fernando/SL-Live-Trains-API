const express = require('express');
const router = express.Router();
const tripStationController = require('../controllers/trip-station-controller');

router.get('/', tripStationController.getAllTripStations);
router.get('/:trip_id/:station_id/:stop_sequence', tripStationController.getTripStationById);
router.post('/', tripStationController.createTripStation);
router.put('/:trip_id/:station_id/:stop_sequence', tripStationController.updateTripStation);
router.delete('/:trip_id/:station_id/:stop_sequence', tripStationController.deleteTripStation);

module.exports = router;
