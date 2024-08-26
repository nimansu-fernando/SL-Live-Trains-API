const db = require('../config/db-config');

const getAllRoutes = () => {
    return db.query('SELECT * FROM routes');
};

const getRouteById = (id) => {
    return db.query('SELECT * FROM routes WHERE id = ?', [id]);
};

const createRoute = (route) => {
    return db.query('INSERT INTO routes SET ?', route);
};

const updateRoute = (id, route) => {
    return db.query('UPDATE routes SET ? WHERE id = ?', [route, id]);
};

const deleteRoute = (id) => {
    return db.query('DELETE FROM routes WHERE id = ?', [id]);
};

const getRouteNameByRouteId = (routeId) => {
    return db.query('SELECT name FROM routes WHERE route_key = ?', [routeId]);
};

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    getRouteNameByRouteId
};
