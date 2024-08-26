const LocationModel = require('../models/location-model');

async function storeOrUpdateLocation(data) {
    try {
        const existingLocation = await LocationModel.findOne({ deviceID: data.deviceID });

        if (existingLocation) {
            existingLocation.latitude = data.latitude;
            existingLocation.longitude = data.longitude;
            existingLocation.speed = data.speed;
            existingLocation.timestamp = data.timestamp;
            existingLocation.geoLocation = data.geoLocation;
        } else {
            const newLocation = new LocationModel(data);
            return newLocation;
        }

        await existingLocation.save();  
        return existingLocation;
    } catch (error) {
        throw new Error('Failed to store or update location');
    }
}

async function getAllActiveLocations() {
    try {
        const locations = await LocationModel.find({});
        return locations;
    } catch (error) {
        console.error('Error fetching active locations:', error.message);
        throw new Error('Failed to retrieve active locations');
    }
}

module.exports = {
    storeOrUpdateLocation,
    getAllActiveLocations
};
