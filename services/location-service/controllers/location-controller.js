const LocationModel = require('../models/location-model');
const locationService = require('../services/location-service');
require('dotenv').config();
const axios = require('axios');

const LOCOMOTIVE_SERVICE_URL = process.env.LOCOMOTIVE_SERVICE_URL; 
const TRIP_MANAGEMENT_SERVICE_URL = process.env.TRIP_MANAGEMENT_SERVICE_URL; 
const RAILWAY_INFRASTRUCTURE_SERVICE_URL = process.env.RAILWAY_INFRASTRUCTURE_SERVICE_URL; 

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

const postLocationData = async (req, res) => {
    try {
        const data = req.body;

        if (!data.deviceID || !data.latitude || !data.longitude || !data.timestamp) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let location = await LocationModel.findOne({ deviceID: data.deviceID });
        
        if (location) {
            // update existing data
            location.latitude = data.latitude;
            location.longitude = data.longitude;
            location.speed = data.speed;
            location.timestamp = data.timestamp;
            location.geoLocation = data.geoLocation;
        } else {
            const deviceID = data.deviceID;
            const geoLocation = data.geoLocation;
            const timestamp = data.timestamp;

            // get engine id 
            const engineResponse = await axios.get(`${LOCOMOTIVE_SERVICE_URL}/engines/by-device/${deviceID}`);
            const engineNumber = engineResponse.data.engine_number;

            // get train id
            const trainResponse = await axios.get(`${LOCOMOTIVE_SERVICE_URL}/trains/by-engine/${engineNumber}`);
            const { train_number: trainID, name: trainName } = trainResponse.data;

            // get trip details
            const tripResponse = await axios.get(`${TRIP_MANAGEMENT_SERVICE_URL}/trips/train/${trainID}`);
            const { trip_number: tripNumber, route_id: routeID, type } = tripResponse.data[0];

            // get schedule details
            const scheduleResponse = await axios.get(`${TRIP_MANAGEMENT_SERVICE_URL}/schedules/trip/${tripNumber}`);
            const { start_time, end_time, frequency, duration } = scheduleResponse.data[0];

            // get route name
            const routeResponse = await axios.get(`${RAILWAY_INFRASTRUCTURE_SERVICE_URL}/routes/name/${routeID}`);
            const routeName = routeResponse.data.name;

            // get stopping stations
            const stationsResponse = await axios.get(`${TRIP_MANAGEMENT_SERVICE_URL}/trip-stations/stations/${tripNumber}`);
            const stations = stationsResponse.data;

            // get stopping stations names
            const stoppingStations = [];
            for (const station of stations) {
                const { station_id, arrival_time, departure_time } = station;

                const stationNameResponse = await axios.get(`${RAILWAY_INFRASTRUCTURE_SERVICE_URL}/stations/name/${station_id}`);
                const stationName = stationNameResponse.data.name;

                stoppingStations.push({
                    station_id,
                    station_name: stationName,
                    arrival_time,
                    departure_time,
                });
            }

            const startStation = stoppingStations.length > 0 ? stoppingStations[0].station_name : '';
            const endStation = stoppingStations.length > 0 ? stoppingStations[stoppingStations.length - 1].station_name : '';

            location = new LocationModel({
                ...data,
                route_name: routeName,
                trip_number: tripNumber,
                train_name: trainName,
                type,
                frequency,
                start_time,
                end_time,
                start_station: startStation,
                end_station: endStation,
                duration,
                last_update_location: geoLocation,
                last_update_time: timestamp,
                stopping_stations: stoppingStations
            });
        }

        await location.save();
        res.status(200).json({ message: 'Location data processed successfully', data: location });
    } catch (error) {
        console.error('Error processing location data:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllLocations,
    postLocationData
};
