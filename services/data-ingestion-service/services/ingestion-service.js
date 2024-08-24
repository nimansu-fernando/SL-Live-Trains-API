const IngestionModel = require('../models/ingestion-model');
const axios = require('axios');

const LOCATION_SERVICE_URL = 'http://localhost:3000/location/api/location';

async function reverseGeocode(latitude, longitude) {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;
    
    try {
        const response = await axios.get(nominatimUrl);
        const data = response.data;

        let geoLocation;

        if (data.address && (data.address.railway || data.name) && (data.addresstype === 'railway' || data.class === 'railway' || data.type === 'station')) {
            geoLocation = data.address.railway || data.name;
        } else {
            geoLocation = data.address.suburb || data.address.village || data.name || 'Heading to next station';
        }

        return geoLocation;
    } catch (error) {
        console.error('Error in reverse geocoding:', error.message);
        return 'Unknown Location';
    }
}

async function ingestData(data) {
    try {
        if (!data.deviceID || !data.latitude || !data.longitude || !data.timestamp) {
            console.error('Invalid data received:', data);
            return;
        }

        const ingestedData = new IngestionModel(data);
        await ingestedData.save();

        const geoLocation = await reverseGeocode(data.latitude, data.longitude);

        const enrichedData = { ...data, geoLocation };

        console.log('Processed data with location:', enrichedData);

        await axios.post(LOCATION_SERVICE_URL, enrichedData);

        return enrichedData;
    } catch (error) {
        console.error('Failed to process and store data:', error.message);
        throw new Error('Failed to process data');
    }
}

module.exports = {
    ingestData,
};
