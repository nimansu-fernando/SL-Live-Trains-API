const routeService = require('../services/route-service');

exports.getAllRoutes = async (req, res) => {
    try {
        const [rows] = await routeService.getAllRoutes();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving routes', error });
    }
};

exports.getRouteById = async (req, res) => {
    try {
        const [rows] = await routeService.getRouteById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving route', error });
    }
};

exports.createRoute = async (req, res) => {
    try {
        const result = await routeService.createRoute(req.body);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating route', error });
    }
};

exports.updateRoute = async (req, res) => {
    try {
        await routeService.updateRoute(req.params.id, req.body);
        res.json({ message: 'Route updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating route', error });
    }
};

exports.deleteRoute = async (req, res) => {
    try {
        await routeService.deleteRoute(req.params.id);
        res.json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting route', error });
    }
};

exports.getRouteNameByRouteId = async (req, res) => {
    try {
        const [rows] = await routeService.getRouteNameByRouteId(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.json({ name: rows[0].name });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving route name', error });
    }
};