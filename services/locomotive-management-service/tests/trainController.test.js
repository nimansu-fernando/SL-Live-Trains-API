const trainController = require('../controllers/train-controller');
const trainService = require('../services/train-service');

jest.mock('../services/train-service');

describe('Train Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllTrains', () => {
        it('should return all trains', async () => {
            const trains = [{ id: 1, train_number: 'T1' }, { id: 2, train_number: 'T2' }];
            trainService.getAllTrains.mockResolvedValue([trains]);

            await trainController.getAllTrains(req, res);

            expect(trainService.getAllTrains).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(trains);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            trainService.getAllTrains.mockRejectedValue(error);

            await trainController.getAllTrains(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving trains', error });
        });
    });

    describe('getTrainById', () => {
        it('should return the train if found', async () => {
            const train = { id: 1, train_number: 'T1' };
            req.params.id = 1;
            trainService.getTrainById.mockResolvedValue([[train]]);

            await trainController.getTrainById(req, res);

            expect(trainService.getTrainById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(train);
        });

        it('should return 404 if train not found', async () => {
            req.params.id = 1;
            trainService.getTrainById.mockResolvedValue([[]]);

            await trainController.getTrainById(req, res);

            expect(trainService.getTrainById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Train not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            trainService.getTrainById.mockRejectedValue(error);

            await trainController.getTrainById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving train', error });
        });
    });

    describe('createTrain', () => {
        it('should create a new train', async () => {
            const newTrain = { train_number: 'T1' };
            req.body = newTrain;
            const result = { insertId: 1 };
            trainService.createTrain.mockResolvedValue(result);

            await trainController.createTrain(req, res);

            expect(trainService.createTrain).toHaveBeenCalledWith(newTrain);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, ...newTrain });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            trainService.createTrain.mockRejectedValue(error);

            await trainController.createTrain(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating train', error });
        });
    });

    describe('updateTrain', () => {
        it('should update an existing train', async () => {
            req.params.id = 1;
            req.body = { train_number: 'Updated T1' };

            await trainController.updateTrain(req, res);

            expect(trainService.updateTrain).toHaveBeenCalledWith(1, req.body);
            expect(res.json).toHaveBeenCalledWith({ message: 'Train updated successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            trainService.updateTrain.mockRejectedValue(error);

            await trainController.updateTrain(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating train', error });
        });
    });

    describe('deleteTrain', () => {
        it('should delete an existing train', async () => {
            req.params.id = 1;

            await trainController.deleteTrain(req, res);

            expect(trainService.deleteTrain).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Train deleted successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            trainService.deleteTrain.mockRejectedValue(error);

            await trainController.deleteTrain(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting train', error });
        });
    });

    describe('getTrainNumberByEngineNumber', () => {
        it('should return the train number if found', async () => {
            const train = { train_number: 'T1' };
            req.params.engine_number = 'E1';
            trainService.getTrainNumberByEngineNumber.mockResolvedValue([[train]]);

            await trainController.getTrainNumberByEngineNumber(req, res);

            expect(trainService.getTrainNumberByEngineNumber).toHaveBeenCalledWith('E1');
            expect(res.json).toHaveBeenCalledWith(train);
        });

        it('should return 404 if train not found', async () => {
            req.params.engine_number = 'E1';
            trainService.getTrainNumberByEngineNumber.mockResolvedValue([[]]);

            await trainController.getTrainNumberByEngineNumber(req, res);

            expect(trainService.getTrainNumberByEngineNumber).toHaveBeenCalledWith('E1');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Train not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.engine_number = 'E1';
            trainService.getTrainNumberByEngineNumber.mockRejectedValue(error);

            await trainController.getTrainNumberByEngineNumber(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving train number', error });
        });
    });
});
