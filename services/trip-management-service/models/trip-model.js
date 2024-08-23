const db = require('../config/db-config');

const getAllTrips = () => {
    return db.query('SELECT * FROM trips');
};

const getTripById = (id) => {
    return db.query('SELECT * FROM trips WHERE id = ?', [id]);
};

const createTrip = (trip) => {
    return db.query('INSERT INTO trips SET ?', trip);
};

const updateTrip = (id, trip) => {
    return db.query('UPDATE trips SET ? WHERE id = ?', [trip, id]);
};

const deleteTrip = (id) => {
    return db.query('DELETE FROM trips WHERE id = ?', [id]);
};

module.exports = {
    getAllTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip
};
