const db = require('../config/db-config');

const getAllTripStations = () => {
    return db.query('SELECT * FROM trip_stations');
};

const getTripStationByCompositeKey = (trip_id, station_id, stop_sequence) => {
    return db.query(
        'SELECT * FROM trip_stations WHERE trip_id = ? AND station_id = ? AND stop_sequence = ?',
        [trip_id, station_id, stop_sequence]
    );
};

const createTripStation = (tripStation) => {
    return db.query('INSERT INTO trip_stations SET ?', tripStation);
};

const updateTripStationByCompositeKey = (trip_id, station_id, stop_sequence, tripStation) => {
    return db.query(
        'UPDATE trip_stations SET ? WHERE trip_id = ? AND station_id = ? AND stop_sequence = ?',
        [tripStation, trip_id, station_id, stop_sequence]
    );
};

const deleteTripStationByCompositeKey = (trip_id, station_id, stop_sequence) => {
    return db.query(
        'DELETE FROM trip_stations WHERE trip_id = ? AND station_id = ? AND stop_sequence = ?',
        [trip_id, station_id, stop_sequence]
    );
};

module.exports = {
    getAllTripStations,
    getTripStationByCompositeKey,
    createTripStation,
    updateTripStationByCompositeKey,
    deleteTripStationByCompositeKey
};
