const tripController = require('../controllers/trip-controller');
const tripService = require('../services/trip-service');

jest.mock('../services/trip-service');

describe('Trip Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllTrips', () => {
        it('should return all trips', async () => {
            const trips = [{ id: 1, trip_name: 'Trip1' }, { id: 2, trip_name: 'Trip2' }];
            tripService.getAllTrips.mockResolvedValue([trips]);

            await tripController.getAllTrips(req, res);

            expect(tripService.getAllTrips).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(trips);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            tripService.getAllTrips.mockRejectedValue(error);

            await tripController.getAllTrips(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving trips', error });
        });
    });

    describe('getTripById', () => {
        it('should return the trip if found', async () => {
            const trip = { id: 1, trip_name: 'Trip1' };
            req.params.id = 1;
            tripService.getTripById.mockResolvedValue([[trip]]);

            await tripController.getTripById(req, res);

            expect(tripService.getTripById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(trip);
        });

        it('should return 404 if trip not found', async () => {
            req.params.id = 1;
            tripService.getTripById.mockResolvedValue([[]]);

            await tripController.getTripById(req, res);

            expect(tripService.getTripById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Trip not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            tripService.getTripById.mockRejectedValue(error);

            await tripController.getTripById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving trip', error });
        });
    });

    describe('createTrip', () => {
        it('should create a new trip', async () => {
            const newTrip = { trip_name: 'New Trip' };
            req.body = newTrip;
            const result = { insertId: 1 };
            tripService.createTrip.mockResolvedValue(result);

            await tripController.createTrip(req, res);

            expect(tripService.createTrip).toHaveBeenCalledWith(newTrip);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, ...newTrip });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            tripService.createTrip.mockRejectedValue(error);

            await tripController.createTrip(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating trip', error });
        });
    });

    describe('updateTrip', () => {
        it('should update an existing trip', async () => {
            req.params.id = 1;
            req.body = { trip_name: 'Updated Trip' };

            await tripController.updateTrip(req, res);

            expect(tripService.updateTrip).toHaveBeenCalledWith(1, req.body);
            expect(res.json).toHaveBeenCalledWith({ message: 'Trip updated successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            tripService.updateTrip.mockRejectedValue(error);

            await tripController.updateTrip(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating trip', error });
        });
    });

    describe('deleteTrip', () => {
        it('should delete an existing trip', async () => {
            req.params.id = 1;

            await tripController.deleteTrip(req, res);

            expect(tripService.deleteTrip).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Trip deleted successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            tripService.deleteTrip.mockRejectedValue(error);

            await tripController.deleteTrip(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting trip', error });
        });
    });

    describe('getTripDetailsByTrainId', () => {
        it('should return trip details by train ID if found', async () => {
            const tripDetails = [{ id: 1, train_id: 'T1', trip_name: 'Trip1' }];
            req.params.train_id = 'T1';
            tripService.getTripDetailsByTrainId.mockResolvedValue([tripDetails]);

            await tripController.getTripDetailsByTrainId(req, res);

            expect(tripService.getTripDetailsByTrainId).toHaveBeenCalledWith('T1');
            expect(res.json).toHaveBeenCalledWith(tripDetails);
        });

        it('should return 404 if trip details not found', async () => {
            req.params.train_id = 'T1';
            tripService.getTripDetailsByTrainId.mockResolvedValue([[]]);

            await tripController.getTripDetailsByTrainId(req, res);

            expect(tripService.getTripDetailsByTrainId).toHaveBeenCalledWith('T1');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Trip not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.train_id = 'T1';
            tripService.getTripDetailsByTrainId.mockRejectedValue(error);

            await tripController.getTripDetailsByTrainId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving trip details', error });
        });
    });
});
