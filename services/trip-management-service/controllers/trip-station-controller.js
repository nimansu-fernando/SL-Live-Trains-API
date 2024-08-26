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
    try {
        const [rows] = await tripStationService.getTripStationById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Trip station not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trip station', error });
    }
};

exports.createTripStation = async (req, res) => {
    try {
        const result = await tripStationService.createTripStation(req.body);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating trip station', error });
    }
};

exports.updateTripStation = async (req, res) => {
    try {
        await tripStationService.updateTripStation(req.params.id, req.body);
        res.json({ message: 'Trip station updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating trip station', error });
    }
};

exports.deleteTripStation = async (req, res) => {
    try {
        await tripStationService.deleteTripStation(req.params.id);
        res.json({ message: 'Trip station deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trip station', error });
    }
};

exports.getStationsByTripId = async (req, res) => {
    try {
        const { trip_id } = req.params;
        const [rows] = await tripStationService.getStationsByTripId(trip_id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Stations not found' });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving stations', error });
    }
};