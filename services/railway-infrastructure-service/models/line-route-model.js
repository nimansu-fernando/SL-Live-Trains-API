const db = require('../config/db-config');

const getAllLineRoutes = () => {
    return db.query('SELECT * FROM line_routes');
};

const getLineRoute = (line_code, route_key) => {
    return db.query('SELECT * FROM line_routes WHERE line_code = ? AND route_key = ?', [line_code, route_key]);
};

const createLineRoute = (lineRoute) => {
    return db.query('INSERT INTO line_routes SET ?', lineRoute);
};

const updateLineRoute = (line_code, route_key, lineRoute) => {
    return db.query('UPDATE line_routes SET ? WHERE line_code = ? AND route_key = ?', [lineRoute, line_code, route_key]);
};

const deleteLineRoute = (line_code, route_key) => {
    return db.query('DELETE FROM line_routes WHERE line_code = ? AND route_key = ?', [line_code, route_key]);
};

module.exports = {
    getAllLineRoutes,
    getLineRoute,
    createLineRoute,
    updateLineRoute,
    deleteLineRoute
};
