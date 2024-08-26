const lineRouteController = require('../controllers/line-route-controller');
const lineRouteService = require('../services/line-route-service');

jest.mock('../services/line-route-service');

describe('Line Route Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllLineRoutes', () => {
        it('should return all line routes', async () => {
            const lineRoutes = [{ line_code: 'L1', route_key: 'R1' }, { line_code: 'L2', route_key: 'R2' }];
            lineRouteService.getAllLineRoutes.mockResolvedValue(lineRoutes);

            await lineRouteController.getAllLineRoutes(req, res);

            expect(lineRouteService.getAllLineRoutes).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(lineRoutes);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            lineRouteService.getAllLineRoutes.mockRejectedValue(error);

            await lineRouteController.getAllLineRoutes(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving line routes', error });
        });
    });

    describe('getLineRoute', () => {
        it('should return the line route if found', async () => {
            const lineRoute = { line_code: 'L1', route_key: 'R1', name: 'Route 1' };
            req.params.line_code = 'L1';
            req.params.route_key = 'R1';
            lineRouteService.getLineRoute.mockResolvedValue(lineRoute);

            await lineRouteController.getLineRoute(req, res);

            expect(lineRouteService.getLineRoute).toHaveBeenCalledWith('L1', 'R1');
            expect(res.json).toHaveBeenCalledWith(lineRoute);
        });

        it('should return 404 if line route not found', async () => {
            req.params.line_code = 'L1';
            req.params.route_key = 'R1';
            lineRouteService.getLineRoute.mockResolvedValue(null);

            await lineRouteController.getLineRoute(req, res);

            expect(lineRouteService.getLineRoute).toHaveBeenCalledWith('L1', 'R1');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Line route not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.line_code = 'L1';
            req.params.route_key = 'R1';
            lineRouteService.getLineRoute.mockRejectedValue(error);

            await lineRouteController.getLineRoute(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving line route', error });
        });
    });

    describe('createLineRoute', () => {
        it('should create a new line route', async () => {
            const newLineRoute = { line_code: 'L1', route_key: 'R1', name: 'Route 1' };
            req.body = newLineRoute;
            lineRouteService.createLineRoute.mockResolvedValue(newLineRoute);

            await lineRouteController.createLineRoute(req, res);

            expect(lineRouteService.createLineRoute).toHaveBeenCalledWith(newLineRoute);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newLineRoute);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            lineRouteService.createLineRoute.mockRejectedValue(error);

            await lineRouteController.createLineRoute(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating line route', error });
        });
    });

    describe('updateLineRoute', () => {
        it('should update an existing line route', async () => {
            req.params.line_code = 'L1';
            req.params.route_key = 'R1';
            req.body = { name: 'Updated Route' };

            await lineRouteController.updateLineRoute(req, res);

            expect(lineRouteService.updateLineRoute).toHaveBeenCalledWith('L1', 'R1', req.body);
            expect(res.json).toHaveBeenCalledWith({ message: 'Line route updated successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.line_code = 'L1';
            req.params.route_key = 'R1';
            lineRouteService.updateLineRoute.mockRejectedValue(error);

            await lineRouteController.updateLineRoute(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating line route', error });
        });
    });

    describe('deleteLineRoute', () => {
        it('should delete an existing line route', async () => {
            req.params.line_code = 'L1';
            req.params.route_key = 'R1';

            await lineRouteController.deleteLineRoute(req, res);

            expect(lineRouteService.deleteLineRoute).toHaveBeenCalledWith('L1', 'R1');
            expect(res.json).toHaveBeenCalledWith({ message: 'Line route deleted successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.line_code = 'L1';
            req.params.route_key = 'R1';
            lineRouteService.deleteLineRoute.mockRejectedValue(error);

            await lineRouteController.deleteLineRoute(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting line route', error });
        });
    });
});
