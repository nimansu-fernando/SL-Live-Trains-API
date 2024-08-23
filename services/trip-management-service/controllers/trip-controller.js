const tripService = require('../services/trip-service');

exports.getAllTrips = async (req, res) => {
    try {
        const [rows] = await tripService.getAllTrips();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trips', error });
    }
};

exports.getTripById = async (req, res) => {
    try {
        const [rows] = await tripService.getTripById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trip', error });
    }
};

exports.createTrip = async (req, res) => {
    try {
        const result = await tripService.createTrip(req.body);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating trip', error });
    }
};

exports.updateTrip = async (req, res) => {
    try {
        await tripService.updateTrip(req.params.id, req.body);
        res.json({ message: 'Trip updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating trip', error });
    }
};

exports.deleteTrip = async (req, res) => {
    try {
        await tripService.deleteTrip(req.params.id);
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trip', error });
    }
};
