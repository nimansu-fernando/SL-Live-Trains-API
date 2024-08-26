require('dotenv').config();

const config = {
    PORT: process.env.PORT,
    SERVICE_URLS: {
        RAILWAY_INFRASTRUCTURE: process.env.RAILWAY_INFRASTRUCTURE_URL,
        LOCOMOTIVE_MANAGEMENT: process.env.LOCOMOTIVE_MANAGEMENT_URL,
        TRIP_MANAGEMENT: process.env.TRIP_MANAGEMENT_URL,
        LOCATION: process.env.LOCATION_URL,
        DATA_INGESTION: process.env.DATA_INGESTION_URL,
        USER: process.env.USER_SERVICE_URL
    }
};

module.exports = config;
