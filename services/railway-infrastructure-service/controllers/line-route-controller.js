const lineRouteService = require('../services/line-route-service');

exports.getAllLineRoutes = async (req, res) => {
    try {
        const lineRoutes = await lineRouteService.getAllLineRoutes();
        res.json(lineRoutes);
    } catch (error) {
        console.error('Error retrieving line routes:', error); // Log error details
        res.status(500).json({ message: 'Error retrieving line routes', error });
    }
};

exports.getLineRoute = async (req, res) => {
    try {
        const { line_code, route_key } = req.params;
        const lineRoute = await lineRouteService.getLineRoute(line_code, route_key);
        if (!lineRoute) {
            return res.status(404).json({ message: 'Line route not found' });
        }
        res.json(lineRoute);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving line route', error });
    }
};

exports.createLineRoute = async (req, res) => {
    try {
        const lineRoute = await lineRouteService.createLineRoute(req.body);
        res.status(201).json(lineRoute);
    } catch (error) {
        res.status(500).json({ message: 'Error creating line route', error });
    }
};

exports.updateLineRoute = async (req, res) => {
    try {
        const { line_code, route_key } = req.params;
        await lineRouteService.updateLineRoute(line_code, route_key, req.body);
        res.json({ message: 'Line route updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating line route', error });
    }
};

exports.deleteLineRoute = async (req, res) => {
    try {
        const { line_code, route_key } = req.params;
        await lineRouteService.deleteLineRoute(line_code, route_key);
        res.json({ message: 'Line route deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting line route', error });
    }
};
