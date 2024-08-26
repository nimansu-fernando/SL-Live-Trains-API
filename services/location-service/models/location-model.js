const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    deviceID: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed: { type: Number, default: 0 },
    timestamp: { type: Date, required: true },
    geoLocation: { type: String, default: 'Heading to next station' },
    route_name: { type: String, default: '' },
    trip_number: { type: String, default: '' },
    train_name: { type: String, default: '' },
    type: { type: String, default: '' },
    frequency: { type: String, default: '' },
    start_time: { type: String, default: '' },
    end_time: { type: String, default: '' },
    start_station: { type: String, default: '' },
    end_station: { type: String, default: '' },
    duration: { type: String, default: '' },
    stopping_stations: [{
        station_id: { type: String, default: '' },
        station_name: { type: String, default: '' },
        arrival_time: { type: String, default: '' },
        departure_time: { type: String, default: '' }
    }]
}, { timestamps: true });

const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;
