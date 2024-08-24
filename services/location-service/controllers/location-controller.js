const LocationModel = require('../models/location-model');
const locationService = require('../services/location-service');
const axios = require('axios');

const getAllLocations = async (req, res) => {
    try {
        const locations = await LocationModel.find({});
        if (locations.length === 0) {
            return res.status(404).json({ message: 'No location data found' });
        }

        res.status(200).json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllLocations
};
