const routeController = require('../controllers/route-controller');
const routeService = require('../services/route-service');

jest.mock('../services/route-service');

describe('Route Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllRoutes', () => {
        it('should return all routes', async () => {
            const routes = [{ id: 1, name: 'Route 1' }, { id: 2, name: 'Route 2' }];
            routeService.getAllRoutes.mockResolvedValue([routes]);

            await routeController.getAllRoutes(req, res);

            expect(routeService.getAllRoutes).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(routes);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            routeService.getAllRoutes.mockRejectedValue(error);

            await routeController.getAllRoutes(req, res);

            expect(routeService.getAllRoutes).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving routes', error });
        });
    });

    describe('getRouteById', () => {
        it('should return the route if found', async () => {
            const route = { id: 1, name: 'Route 1' };
            req.params.id = 1;
            routeService.getRouteById.mockResolvedValue([[route]]);

            await routeController.getRouteById(req, res);

            expect(routeService.getRouteById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(route);
        });

        it('should return 404 if route not found', async () => {
            req.params.id = 1;
            routeService.getRouteById.mockResolvedValue([[]]);

            await routeController.getRouteById(req, res);

            expect(routeService.getRouteById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Route not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            routeService.getRouteById.mockRejectedValue(error);

            await routeController.getRouteById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving route', error });
        });
    });

    describe('createRoute', () => {
        it('should create a new route', async () => {
            const newRoute = { name: 'New Route' };
            req.body = newRoute;
            routeService.createRoute.mockResolvedValue({ insertId: 1 });

            await routeController.createRoute(req, res);

            expect(routeService.createRoute).toHaveBeenCalledWith(newRoute);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, ...newRoute });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            routeService.createRoute.mockRejectedValue(error);

            await routeController.createRoute(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating route', error });
        });
    });

    describe('updateRoute', () => {
        it('should update an existing route', async () => {
            req.params.id = 1;
            req.body = { name: 'Updated Route' };

            await routeController.updateRoute(req, res);

            expect(routeService.updateRoute).toHaveBeenCalledWith(1, req.body);
            expect(res.json).toHaveBeenCalledWith({ message: 'Route updated successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            routeService.updateRoute.mockRejectedValue(error);

            await routeController.updateRoute(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating route', error });
        });
    });

    describe('deleteRoute', () => {
        it('should delete an existing route', async () => {
            req.params.id = 1;

            await routeController.deleteRoute(req, res);

            expect(routeService.deleteRoute).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Route deleted successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            routeService.deleteRoute.mockRejectedValue(error);

            await routeController.deleteRoute(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting route', error });
        });
    });

    describe('getRouteNameByRouteId', () => {
        it('should return the route name if found', async () => {
            const route = { name: 'Route 1' };
            req.params.id = 1;
            routeService.getRouteNameByRouteId.mockResolvedValue([[route]]);

            await routeController.getRouteNameByRouteId(req, res);

            expect(routeService.getRouteNameByRouteId).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({ name: route.name });
        });

        it('should return 404 if route not found', async () => {
            req.params.id = 1;
            routeService.getRouteNameByRouteId.mockResolvedValue([[]]);

            await routeController.getRouteNameByRouteId(req, res);

            expect(routeService.getRouteNameByRouteId).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Route not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            routeService.getRouteNameByRouteId.mockRejectedValue(error);

            await routeController.getRouteNameByRouteId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving route name', error });
        });
    });
});
