const db = require('../config/db-config');

const getAllLines = () => {
    return db.query('SELECT * FROM line');
};

const getLineById = (id) => {
    return db.query('SELECT * FROM line WHERE id = ?', [id]);
};

const createLine = (line) => {
    return db.query('INSERT INTO line SET ?', line);
};

const updateLine = (id, line) => {
    return db.query('UPDATE line SET ? WHERE id = ?', [line, id]);
};

const deleteLine = (id) => {
    return db.query('DELETE FROM line WHERE id = ?', [id]);
};

module.exports = {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine
};
