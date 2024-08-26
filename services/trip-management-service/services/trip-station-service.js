const tripStationModel = require('../models/trip-station-model');

const getAllTripStations = () => {
    return tripStationModel.getAllTripStations();
};

const getTripStationById = (id) => {
    return tripStationModel.getTripStationById(id);
};

const createTripStation = (tripStation) => {
    return tripStationModel.createTripStation(tripStation);
};

const updateTripStation = (id, tripStation) => {
    return tripStationModel.updateTripStation(id, tripStation);
};

const deleteTripStation = (id) => {
    return tripStationModel.deleteTripStation(id);
};

const getStationsByTripId = (trip_id) => {
    return tripStationModel.getStationsByTripId(trip_id);
};

module.exports = {
    getAllTripStations,
    getTripStationById,
    createTripStation,
    updateTripStation,
    deleteTripStation,
    getStationsByTripId
};
