const db = require('../config/db-config');

const getAllTripStations = () => {
    return db.query('SELECT * FROM trip_stations');
};

const getTripStationById = (id) => {
    return db.query('SELECT * FROM trip_stations WHERE id = ?', [id]);
};

const createTripStation = (tripStation) => {
    return db.query('INSERT INTO trip_stations SET ?', tripStation);
};

const updateTripStation = (id, tripStation) => {
    return db.query('UPDATE trip_stations SET ? WHERE id = ?', [tripStation, id]);
};

const deleteTripStation = (id) => {
    return db.query('DELETE FROM trip_stations WHERE id = ?', [id]);
};

const getStationsByTripId = (trip_id) => {
    return db.query(
        'SELECT station_id, arrival_time, departure_time FROM trip_stations WHERE trip_id = ? ORDER BY stop_sequence',
        [trip_id]
    );
};

module.exports = {
    getAllTripStations,
    getTripStationById,
    createTripStation,
    updateTripStation,
    deleteTripStation,
    getStationsByTripId
};
