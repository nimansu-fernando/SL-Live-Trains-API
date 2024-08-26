const stationController = require('../controllers/station-controller');
const stationService = require('../services/station-service');

jest.mock('../services/station-service');

describe('Station Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllStations', () => {
        it('should return all stations', async () => {
            const stations = [{ id: 1, name: 'Station 1' }, { id: 2, name: 'Station 2' }];
            stationService.getAllStations.mockResolvedValue([stations]);

            await stationController.getAllStations(req, res);

            expect(stationService.getAllStations).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(stations);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            stationService.getAllStations.mockRejectedValue(error);

            await stationController.getAllStations(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving stations', error });
        });
    });

    describe('getStationById', () => {
        it('should return the station if found', async () => {
            const station = { id: 1, name: 'Station 1' };
            req.params.id = 1;
            stationService.getStationById.mockResolvedValue([[station]]);

            await stationController.getStationById(req, res);

            expect(stationService.getStationById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(station);
        });

        it('should return 404 if station not found', async () => {
            req.params.id = 1;
            stationService.getStationById.mockResolvedValue([[]]);

            await stationController.getStationById(req, res);

            expect(stationService.getStationById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Station not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            stationService.getStationById.mockRejectedValue(error);

            await stationController.getStationById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving station', error });
        });
    });

    describe('createStation', () => {
        it('should create a new station', async () => {
            const newStation = { name: 'New Station' };
            req.body = newStation;
            stationService.createStation.mockResolvedValue({ insertId: 1 });

            await stationController.createStation(req, res);

            expect(stationService.createStation).toHaveBeenCalledWith(newStation);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, ...newStation });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            stationService.createStation.mockRejectedValue(error);

            await stationController.createStation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating station', error });
        });
    });

    describe('updateStation', () => {
        it('should update an existing station', async () => {
            req.params.id = 1;
            req.body = { name: 'Updated Station' };

            await stationController.updateStation(req, res);

            expect(stationService.updateStation).toHaveBeenCalledWith(1, req.body);
            expect(res.json).toHaveBeenCalledWith({ message: 'Station updated successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            stationService.updateStation.mockRejectedValue(error);

            await stationController.updateStation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating station', error });
        });
    });

    describe('deleteStation', () => {
        it('should delete an existing station', async () => {
            req.params.id = 1;

            await stationController.deleteStation(req, res);

            expect(stationService.deleteStation).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Station deleted successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            stationService.deleteStation.mockRejectedValue(error);

            await stationController.deleteStation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting station', error });
        });
    });

    describe('getStationByCode', () => {
        it('should return the station if found by code', async () => {
            const station = { id: 1, station_code: 'ABC', name: 'Station ABC' };
            req.params.station_code = 'ABC';
            stationService.getStationByCode.mockResolvedValue([[station]]);

            await stationController.getStationByCode(req, res);

            expect(stationService.getStationByCode).toHaveBeenCalledWith('ABC');
            expect(res.json).toHaveBeenCalledWith(station);
        });

        it('should return 404 if station not found by code', async () => {
            req.params.station_code = 'ABC';
            stationService.getStationByCode.mockResolvedValue([[]]);

            await stationController.getStationByCode(req, res);

            expect(stationService.getStationByCode).toHaveBeenCalledWith('ABC');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Station not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.station_code = 'ABC';
            stationService.getStationByCode.mockRejectedValue(error);

            await stationController.getStationByCode(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving station', error });
        });
    });

    describe('getAllStationNamesOrdered', () => {
        it('should return all station names ordered', async () => {
            const stations = [{ name: 'Station 1' }, { name: 'Station 2' }];
            stationService.getAllStationNamesOrdered.mockResolvedValue([stations]);

            await stationController.getAllStationNamesOrdered(req, res);

            expect(stationService.getAllStationNamesOrdered).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(stations);
        });

        it('should return 404 if no stations found', async () => {
            stationService.getAllStationNamesOrdered.mockResolvedValue([[]]);

            await stationController.getAllStationNamesOrdered(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'No stations found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            stationService.getAllStationNamesOrdered.mockRejectedValue(error);

            await stationController.getAllStationNamesOrdered(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving station names', error });
        });
    });
});
