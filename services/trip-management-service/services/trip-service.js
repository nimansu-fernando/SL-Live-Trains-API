const tripModel = require('../models/trip-model');

const getAllTrips = () => {
    return tripModel.getAllTrips();
};

const getTripById = (id) => {
    return tripModel.getTripById(id);
};

const createTrip = (trip) => {
    return tripModel.createTrip(trip);
};

const updateTrip = (id, trip) => {
    return tripModel.updateTrip(id, trip);
};

const deleteTrip = (id) => {
    return tripModel.deleteTrip(id);
};

module.exports = {
    getAllTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip
};
