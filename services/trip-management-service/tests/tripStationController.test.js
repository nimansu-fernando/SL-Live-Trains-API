const tripStationController = require('../controllers/trip-station-controller');
const tripStationService = require('../services/trip-station-service');

jest.mock('../services/trip-station-service');

describe('Trip Station Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllTripStations', () => {
        it('should return all trip stations', async () => {
            const tripStations = [{ id: 1, station_name: 'Station1' }, { id: 2, station_name: 'Station2' }];
            tripStationService.getAllTripStations.mockResolvedValue([tripStations]);

            await tripStationController.getAllTripStations(req, res);

            expect(tripStationService.getAllTripStations).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(tripStations);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            tripStationService.getAllTripStations.mockRejectedValue(error);

            await tripStationController.getAllTripStations(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving trip stations', error });
        });
    });

    describe('getTripStationById', () => {
        it('should return the trip station if found', async () => {
            const tripStation = { id: 1, station_name: 'Station1' };
            req.params.id = 1;
            tripStationService.getTripStationById.mockResolvedValue([[tripStation]]);

            await tripStationController.getTripStationById(req, res);

            expect(tripStationService.getTripStationById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(tripStation);
        });

        it('should return 404 if trip station not found', async () => {
            req.params.id = 1;
            tripStationService.getTripStationById.mockResolvedValue([[]]);

            await tripStationController.getTripStationById(req, res);

            expect(tripStationService.getTripStationById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Trip station not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            tripStationService.getTripStationById.mockRejectedValue(error);

            await tripStationController.getTripStationById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving trip station', error });
        });
    });

    describe('createTripStation', () => {
        it('should create a new trip station', async () => {
            const newTripStation = { station_name: 'New Station' };
            req.body = newTripStation;
            const result = { insertId: 1 };
            tripStationService.createTripStation.mockResolvedValue(result);

            await tripStationController.createTripStation(req, res);

            expect(tripStationService.createTripStation).toHaveBeenCalledWith(newTripStation);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, ...newTripStation });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            tripStationService.createTripStation.mockRejectedValue(error);

            await tripStationController.createTripStation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating trip station', error });
        });
    });

    describe('updateTripStation', () => {
        it('should update an existing trip station', async () => {
            req.params.id = 1;
            req.body = { station_name: 'Updated Station' };

            await tripStationController.updateTripStation(req, res);

            expect(tripStationService.updateTripStation).toHaveBeenCalledWith(1, req.body);
            expect(res.json).toHaveBeenCalledWith({ message: 'Trip station updated successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            tripStationService.updateTripStation.mockRejectedValue(error);

            await tripStationController.updateTripStation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating trip station', error });
        });
    });

    describe('deleteTripStation', () => {
        it('should delete an existing trip station', async () => {
            req.params.id = 1;

            await tripStationController.deleteTripStation(req, res);

            expect(tripStationService.deleteTripStation).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Trip station deleted successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            tripStationService.deleteTripStation.mockRejectedValue(error);

            await tripStationController.deleteTripStation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting trip station', error });
        });
    });

    describe('getStationsByTripId', () => {
        it('should return stations by trip ID if found', async () => {
            const tripStations = [{ id: 1, trip_id: 'T1', station_name: 'Station1' }];
            req.params.trip_id = 'T1';
            tripStationService.getStationsByTripId.mockResolvedValue([tripStations]);

            await tripStationController.getStationsByTripId(req, res);

            expect(tripStationService.getStationsByTripId).toHaveBeenCalledWith('T1');
            expect(res.json).toHaveBeenCalledWith(tripStations);
        });

        it('should return 404 if stations not found', async () => {
            req.params.trip_id = 'T1';
            tripStationService.getStationsByTripId.mockResolvedValue([[]]);

            await tripStationController.getStationsByTripId(req, res);

            expect(tripStationService.getStationsByTripId).toHaveBeenCalledWith('T1');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Stations not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.trip_id = 'T1';
            tripStationService.getStationsByTripId.mockRejectedValue(error);

            await tripStationController.getStationsByTripId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving stations', error });
        });
    });
});
