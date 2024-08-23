const stationModel = require('../models/station-model');

const getAllStations = () => {
    return stationModel.getAllStations();
};

const getStationById = (id) => {
    return stationModel.getStationById(id);
};

const createStation = (station) => {
    return stationModel.createStation(station);
};

const updateStation = (id, station) => {
    return stationModel.updateStation(id, station);
};

const deleteStation = (id) => {
    return stationModel.deleteStation(id);
};

module.exports = {
    getAllStations,
    getStationById,
    createStation,
    updateStation,
    deleteStation
};
