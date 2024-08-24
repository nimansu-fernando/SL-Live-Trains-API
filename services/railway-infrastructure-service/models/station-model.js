const db = require('../config/db-config');

const getAllStations = () => {
    return db.query('SELECT * FROM stations');
};

const getStationById = (id) => {
    return db.query('SELECT * FROM stations WHERE id = ?', [id]);
};

const createStation = (station) => {
    return db.query('INSERT INTO stations SET ?', station);
};

const updateStation = (id, station) => {
    return db.query('UPDATE stations SET ? WHERE id = ?', [station, id]);
};

const deleteStation = (id) => {
    return db.query('DELETE FROM stations WHERE id = ?', [id]);
};

const getStationByCode = (station_code) => {
    return db.query('SELECT * FROM stations WHERE station_code = ?', [station_code]);
};

module.exports = {
    getAllStations,
    getStationById,
    createStation,
    updateStation,
    deleteStation,
    getStationByCode
};
