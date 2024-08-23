const tripStationService = require('../services/trip-station-service');

exports.getAllTripStations = async (req, res) => {
    try {
        const [rows] = await tripStationService.getAllTripStations();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trip stations', error });
    }
};

exports.getTripStationById = async (req, res) => {
    const { trip_id, station_id, stop_sequence } = req.params;
    try {
        const tripStation = await tripStationService.getTripStation(trip_id, station_id, stop_sequence);
        if (!tripStation) {
            return res.status(404).json({ message: 'Trip station not found' });
        }
        res.json(tripStation);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trip station', error });
    }
};

exports.createTripStation = async (req, res) => {
    try {
        const tripStation = await tripStationService.createTripStation(req.body);
        res.status(201).json(tripStation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating trip station', error });
    }
};

exports.updateTripStation = async (req, res) => {
    const { trip_id, station_id, stop_sequence } = req.params;
    try {
        const updatedTripStation = await tripStationService.updateTripStation(trip_id, station_id, stop_sequence, req.body);
        if (!updatedTripStation) {
            return res.status(404).json({ message: 'Trip station not found' });
        }
        res.json(updatedTripStation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating trip station', error });
    }
};

exports.deleteTripStation = async (req, res) => {
    const { trip_id, station_id, stop_sequence } = req.params;
    try {
        const result = await tripStationService.deleteTripStation(trip_id, station_id, stop_sequence);
        if (!result) {
            return res.status(404).json({ message: 'Trip station not found' });
        }
        res.json({ message: 'Trip station deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trip station', error });
    }
};