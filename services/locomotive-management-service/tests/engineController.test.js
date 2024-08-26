const engineController = require('../controllers/engine-controller');
const engineService = require('../services/engine-service');

jest.mock('../services/engine-service');

describe('Engine Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllEngines', () => {
        it('should return all engines', async () => {
            const engines = [{ id: 1, engine_number: 'E1' }, { id: 2, engine_number: 'E2' }];
            engineService.getAllEngines.mockResolvedValue([engines]);

            await engineController.getAllEngines(req, res);

            expect(engineService.getAllEngines).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(engines);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            engineService.getAllEngines.mockRejectedValue(error);

            await engineController.getAllEngines(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving engines', error });
        });
    });

    describe('getEngineById', () => {
        it('should return the engine if found', async () => {
            const engine = { id: 1, engine_number: 'E1' };
            req.params.id = 1;
            engineService.getEngineById.mockResolvedValue([[engine]]);

            await engineController.getEngineById(req, res);

            expect(engineService.getEngineById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(engine);
        });

        it('should return 404 if engine not found', async () => {
            req.params.id = 1;
            engineService.getEngineById.mockResolvedValue([[]]);

            await engineController.getEngineById(req, res);

            expect(engineService.getEngineById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Engine not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            engineService.getEngineById.mockRejectedValue(error);

            await engineController.getEngineById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving engine', error });
        });
    });

    describe('createEngine', () => {
        it('should create a new engine', async () => {
            const newEngine = { engine_number: 'E1' };
            req.body = newEngine;
            const result = { insertId: 1 };
            engineService.createEngine.mockResolvedValue(result);

            await engineController.createEngine(req, res);

            expect(engineService.createEngine).toHaveBeenCalledWith(newEngine);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, ...newEngine });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            engineService.createEngine.mockRejectedValue(error);

            await engineController.createEngine(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating engine', error });
        });
    });

    describe('updateEngine', () => {
        it('should update an existing engine', async () => {
            req.params.id = 1;
            req.body = { engine_number: 'Updated E1' };

            await engineController.updateEngine(req, res);

            expect(engineService.updateEngine).toHaveBeenCalledWith(1, req.body);
            expect(res.json).toHaveBeenCalledWith({ message: 'Engine updated successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            engineService.updateEngine.mockRejectedValue(error);

            await engineController.updateEngine(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating engine', error });
        });
    });

    describe('deleteEngine', () => {
        it('should delete an existing engine', async () => {
            req.params.id = 1;

            await engineController.deleteEngine(req, res);

            expect(engineService.deleteEngine).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Engine deleted successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            engineService.deleteEngine.mockRejectedValue(error);

            await engineController.deleteEngine(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting engine', error });
        });
    });

    describe('getEngineNumberByDeviceId', () => {
        it('should return the engine number if found', async () => {
            const engine = { engine_number: 'E1' };
            req.params.device_id = '10000';
            engineService.getEngineNumberByDeviceId.mockResolvedValue([[engine]]);

            await engineController.getEngineNumberByDeviceId(req, res);

            expect(engineService.getEngineNumberByDeviceId).toHaveBeenCalledWith('10000');
            expect(res.json).toHaveBeenCalledWith(engine);
        });

        it('should return 404 if engine not found', async () => {
            req.params.device_id = '10000';
            engineService.getEngineNumberByDeviceId.mockResolvedValue([[]]);

            await engineController.getEngineNumberByDeviceId(req, res);

            expect(engineService.getEngineNumberByDeviceId).toHaveBeenCalledWith('10000');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Engine not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.device_id = '10000';
            engineService.getEngineNumberByDeviceId.mockRejectedValue(error);

            await engineController.getEngineNumberByDeviceId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving engine number', error });
        });
    });
});
