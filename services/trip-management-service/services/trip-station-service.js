const tripStationModel = require('../models/trip-station-model');

const getAllTripStations = () => {
    return tripStationModel.getAllTripStations();
};

const getTripStation = (trip_id, station_id, stop_sequence) => {
    return tripStationModel.getTripStationByCompositeKey(trip_id, station_id, stop_sequence);
};

const createTripStation = (tripStation) => {
    return tripStationModel.createTripStation(tripStation);
};

const updateTripStation = (trip_id, station_id, stop_sequence, tripStation) => {
    return tripStationModel.updateTripStationByCompositeKey(trip_id, station_id, stop_sequence, tripStation);
};

const deleteTripStation = (trip_id, station_id, stop_sequence) => {
    return tripStationModel.deleteTripStationByCompositeKey(trip_id, station_id, stop_sequence);
};

module.exports = {
    getAllTripStations,
    getTripStation,
    createTripStation,
    updateTripStation,
    deleteTripStation
};
