const db = require('../config/db-config');

const getAllTrains = () => {
    return db.query('SELECT * FROM trains');
};

const getTrainById = (id) => {
    return db.query('SELECT * FROM trains WHERE id = ?', [id]);
};

const createTrain = (train) => {
    return db.query('INSERT INTO trains SET ?', train);
};

const updateTrain = (id, train) => {
    return db.query('UPDATE trains SET ? WHERE id = ?', [train, id]);
};

const deleteTrain = (id) => {
    return db.query('DELETE FROM trains WHERE id = ?', [id]);
};

module.exports = {
    getAllTrains,
    getTrainById,
    createTrain,
    updateTrain,
    deleteTrain
};
