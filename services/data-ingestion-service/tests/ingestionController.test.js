const ingestionController = require('../controllers/ingestion-controller');
const ingestionService = require('../services/ingestion-service');
const { validateIngestionData } = require('../utils/validation');

jest.mock('../services/ingestion-service');
jest.mock('../utils/validation');

describe('Ingestion Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('postIngestedData', () => {
        it('should process and save valid data', async () => {
            req.body = {
                deviceID: '10000',
                latitude: 6.846,
                longitude: 79.862,
                speed: 50,
                timestamp: '2024-08-25T00:00:00Z',
            };

            validateIngestionData.mockReturnValue({ error: null });
            ingestionService.ingestData.mockResolvedValue(req.body);

            await ingestionController.postIngestedData(req, res, next);

            expect(validateIngestionData).toHaveBeenCalledWith(req.body);
            expect(ingestionService.ingestData).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Data processed successfully',
                data: req.body
            });
        });

        it('should return 400 if data validation fails', async () => {
            req.body = {
                deviceID: '10000',
                latitude: 6.846,
                longitude: 79.862,
                speed: 50,
                timestamp: '2024-08-25T00:00:00Z',
            };

            // Ensure the mock returns an error object
            validateIngestionData.mockReturnValue({ error: { message: 'Validation error' } });

            // Ensure ingestionService.ingestData is not called
            ingestionService.ingestData.mockClear();

            await ingestionController.postIngestedData(req, res, next);

            expect(validateIngestionData).toHaveBeenCalledWith(req.body);
            expect(ingestionService.ingestData).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid data', error: 'Validation error' });
        });

        it('should handle errors during data processing', async () => {
            req.body = {
                deviceID: '10000',
                latitude: 6.846,
                longitude: 79.862,
                speed: 50,
                timestamp: '2024-08-25T00:00:00Z',
            };

            validateIngestionData.mockReturnValue({ error: null });
            ingestionService.ingestData.mockRejectedValue(new Error('Processing error'));

            await ingestionController.postIngestedData(req, res, next);

            expect(validateIngestionData).toHaveBeenCalledWith(req.body);
            expect(ingestionService.ingestData).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });
});
