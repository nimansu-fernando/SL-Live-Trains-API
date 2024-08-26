const LocationController = require('../controllers/location-controller');
const LocationModel = require('../models/location-model');
const axios = require('axios');

jest.mock('../models/location-model');
jest.mock('axios');

describe('Location Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, query: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllLocations', () => {
        it('should return all locations', async () => {
            const locations = [{ deviceID: '123', latitude: 1.23, longitude: 4.56 }];
            LocationModel.find.mockResolvedValue(locations);

            await LocationController.getAllLocations(req, res);

            expect(LocationModel.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(locations);
        });

        it('should return 404 if no locations are found', async () => {
            LocationModel.find.mockResolvedValue([]);

            await LocationController.getAllLocations(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'No location data found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            LocationModel.find.mockRejectedValue(error);

            await LocationController.getAllLocations(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('postLocationData', () => {
        it('should process and save location data', async () => {
            req.body = {
                deviceID: '123',
                latitude: 1.23,
                longitude: 4.56,
                timestamp: '2024-08-25T00:00:00Z',
                geoLocation: 'Some Location',
            };

            axios.get
                .mockResolvedValueOnce({ data: { engine_number: '456' } }) // for engines/by-device
                .mockResolvedValueOnce({ data: { train_number: '789', name: 'Train A' } }) // for trains/by-engine
                .mockResolvedValueOnce({ data: [{ trip_number: '001', route_id: '101', type: 'Express' }] }) // for trips/train
                .mockResolvedValueOnce({ data: [{ start_time: '08:00', end_time: '10:00', frequency: 'daily', duration: '2h' }] }) // for schedules/trip
                .mockResolvedValueOnce({ data: { name: 'Route A' } }) // for routes/name
                .mockResolvedValueOnce({ data: [{ station_id: '1', arrival_time: '08:30', departure_time: '08:45' }, { station_id: '2', arrival_time: '09:30', departure_time: '09:45' }] }) // for trip-stations/stations
                .mockResolvedValueOnce({ data: { name: 'Station A' } }) // for stations/name
                .mockResolvedValueOnce({ data: { name: 'Station B' } }); // for stations/name

            LocationModel.findOne.mockResolvedValue(null);
            LocationModel.prototype.save = jest.fn().mockResolvedValue({});

            await LocationController.postLocationData(req, res);

            expect(LocationModel.findOne).toHaveBeenCalledWith({ deviceID: '123' });
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/engines/by-device/123'));
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/trains/by-engine/456'));
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/trips/train/789'));
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/schedules/trip/001'));
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/routes/name/101'));
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/trip-stations/stations/001'));
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/stations/name/1'));
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/stations/name/2'));
            expect(LocationModel.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Location data processed successfully', data: expect.any(LocationModel) });
        });

        it('should return 400 if required fields are missing', async () => {
            req.body = { deviceID: '123', latitude: 1.23, longitude: 4.56 }; // Missing timestamp

            await LocationController.postLocationData(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
        });

        it('should handle errors', async () => {
            req.body = {
                deviceID: '123',
                latitude: 1.23,
                longitude: 4.56,
                timestamp: '2024-08-25T00:00:00Z',
            };

            const error = new Error('Internal server error');
            axios.get.mockRejectedValue(error);

            await LocationController.postLocationData(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('filterTrainDataByStations', () => {
        it('should filter train data by start and end stations', async () => {
            req.query = { startStation: 'Station A', endStation: 'Station B' };
            const locations = [{
                stopping_stations: [
                    { station_name: 'Station A', arrival_time: '08:30', departure_time: '08:45' },
                    { station_name: 'Station B', arrival_time: '09:30', departure_time: '09:45' }
                ]
            }];
            LocationModel.find.mockResolvedValue(locations);

            await LocationController.filterTrainDataByStations(req, res);

            expect(LocationModel.find).toHaveBeenCalledWith({});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(locations);
        });

        it('should return 400 if startStation or endStation are missing', async () => {
            req.query = { startStation: 'Station A' }; // Missing endStation

            await LocationController.filterTrainDataByStations(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Start station and end station are required' });
        });

        it('should handle errors', async () => {
            req.query = { startStation: 'Station A', endStation: 'Station B' };

            const error = new Error('Internal server error');
            LocationModel.find.mockRejectedValue(error);

            await LocationController.filterTrainDataByStations(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });
});
