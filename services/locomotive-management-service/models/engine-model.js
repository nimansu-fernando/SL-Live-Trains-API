const db = require('../config/db-config');

const getAllEngines = () => {
    return db.query('SELECT * FROM engines');
};

const getEngineById = (id) => {
    return db.query('SELECT * FROM engines WHERE id = ?', [id]);
};

const createEngine = (engine) => {
    return db.query('INSERT INTO engines SET ?', engine);
};

const updateEngine = (id, engine) => {
    return db.query('UPDATE engines SET ? WHERE id = ?', [engine, id]);
};

const deleteEngine = (id) => {
    return db.query('DELETE FROM engines WHERE id = ?', [id]);
};

module.exports = {
    getAllEngines,
    getEngineById,
    createEngine,
    updateEngine,
    deleteEngine
};
