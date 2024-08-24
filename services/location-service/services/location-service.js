const LocationModel = require('../models/location-model');

async function storeOrUpdateLocation(data) {
    try {
        // Find an existing location by deviceID
        const existingLocation = await LocationModel.findOne({ deviceID: data.deviceID });

        if (existingLocation) {
            // Update only specific fields
            existingLocation.latitude = data.latitude;
            existingLocation.longitude = data.longitude;
            existingLocation.speed = data.speed;
            existingLocation.timestamp = data.timestamp;
            existingLocation.geoLocation = data.geoLocation;
            // Only update these fields for existing data
        } else {
            // Insert new data with all fields
            const newLocation = new LocationModel(data);
            await newLocation.save();  // Save the new document
            return newLocation;
        }

        await existingLocation.save();  // Save the updated document
        return existingLocation;
    } catch (error) {
        throw new Error('Failed to store or update location');
    }
}

async function getAllActiveLocations() {
    try {
        // Fetch all location documents from the database
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
