const stationService = require('../services/station-service');

exports.getAllStations = async (req, res) => {
    try {
        const [rows] = await stationService.getAllStations();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving stations', error });
    }
};

exports.getStationById = async (req, res) => {
    try {
        const [rows] = await stationService.getStationById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Station not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving station', error });
    }
};

exports.createStation = async (req, res) => {
    try {
        const result = await stationService.createStation(req.body);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating station', error });
    }
};

exports.updateStation = async (req, res) => {
    try {
        await stationService.updateStation(req.params.id, req.body);
        res.json({ message: 'Station updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating station', error });
    }
};

exports.deleteStation = async (req, res) => {
    try {
        await stationService.deleteStation(req.params.id);
        res.json({ message: 'Station deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting station', error });
    }
};
