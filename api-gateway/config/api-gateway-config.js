require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3000,
    SERVICE_URLS: {
        RAILWAY_INFRASTRUCTURE: process.env.RAILWAY_INFRASTRUCTURE_URL || 'http://localhost:3001',
        LOCOMOTIVE_MANAGEMENT: process.env.LOCOMOTIVE_MANAGEMENT_URL || 'http://localhost:3002',
        TRIP_MANAGEMENT: process.env.TRIP_MANAGEMENT_URL || 'http://localhost:3003',
        LOCATION: process.env.LOCATION_URL || 'http://localhost:3004',
        DATA_INGESTION: process.env.DATA_INGESTION_URL || 'http://localhost:3005',
        USER: process.env.USER_SERVICE_URL || 'http://localhost:3007'
    }
};

module.exports = config;
