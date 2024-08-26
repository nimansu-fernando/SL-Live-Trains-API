const routeModel = require('../models/route-model');

const getAllRoutes = () => {
    return routeModel.getAllRoutes();
};

const getRouteById = (id) => {
    return routeModel.getRouteById(id);
};

const createRoute = (route) => {
    return routeModel.createRoute(route);
};

const updateRoute = (id, route) => {
    return routeModel.updateRoute(id, route);
};

const deleteRoute = (id) => {
    return routeModel.deleteRoute(id);
};

const getRouteNameByRouteId = (routeId) => {
    return routeModel.getRouteNameByRouteId(routeId);
};

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    getRouteNameByRouteId
};
