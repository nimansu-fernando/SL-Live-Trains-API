const lineRouteModel = require('../models/line-route-model');

const getAllLineRoutes = () => {
    return lineRouteModel.getAllLineRoutes();
};

const getLineRoute = (line_code, route_key) => {
    return lineRouteModel.getLineRoute(line_code, route_key);
};

const createLineRoute = (lineRoute) => {
    return lineRouteModel.createLineRoute(lineRoute);
};

const updateLineRoute = (line_code, route_key, lineRoute) => {
    return lineRouteModel.updateLineRoute(line_code, route_key, lineRoute);
};

const deleteLineRoute = (line_code, route_key) => {
    return lineRouteModel.deleteLineRoute(line_code, route_key);
};

module.exports = {
    getAllLineRoutes,
    getLineRoute,
    createLineRoute,
    updateLineRoute,
    deleteLineRoute
};
