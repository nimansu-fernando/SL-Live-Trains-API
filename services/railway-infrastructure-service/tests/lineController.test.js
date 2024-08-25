const lineController = require('../controllers/line-controller');
const lineService = require('../services/line-service');

jest.mock('../services/line-service');

describe('Line Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllLines', () => {
        it('should return all lines', async () => {
            const lines = [{ id: 1, name: 'Line 1' }, { id: 2, name: 'Line 2' }];
            lineService.getAllLines.mockResolvedValue([lines]);

            await lineController.getAllLines(req, res);

            expect(lineService.getAllLines).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(lines);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            lineService.getAllLines.mockRejectedValue(error);

            await lineController.getAllLines(req, res);

            expect(lineService.getAllLines).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving lines', error });
        });
    });

    describe('getLineById', () => {
        it('should return the line if found', async () => {
            const line = { id: 1, name: 'Line 1' };
            req.params.id = 1;
            lineService.getLineById.mockResolvedValue([[line]]);

            await lineController.getLineById(req, res);

            expect(lineService.getLineById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(line);
        });

        it('should return 404 if line not found', async () => {
            req.params.id = 1;
            lineService.getLineById.mockResolvedValue([[]]);

            await lineController.getLineById(req, res);

            expect(lineService.getLineById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Line not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            lineService.getLineById.mockRejectedValue(error);

            await lineController.getLineById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving line', error });
        });
    });

    describe('createLine', () => {
        it('should create a new line', async () => {
            const newLine = { name: 'New Line' };
            req.body = newLine;
            lineService.createLine.mockResolvedValue({ insertId: 1 });

            await lineController.createLine(req, res);

            expect(lineService.createLine).toHaveBeenCalledWith(newLine);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, ...newLine });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            lineService.createLine.mockRejectedValue(error);

            await lineController.createLine(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating line', error });
        });
    });

    describe('updateLine', () => {
        it('should update an existing line', async () => {
            req.params.id = 1;
            req.body = { name: 'Updated Line' };

            await lineController.updateLine(req, res);

            expect(lineService.updateLine).toHaveBeenCalledWith(1, req.body);
            expect(res.json).toHaveBeenCalledWith({ message: 'Line updated successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            lineService.updateLine.mockRejectedValue(error);

            await lineController.updateLine(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating line', error });
        });
    });

    describe('deleteLine', () => {
        it('should delete an existing line', async () => {
            req.params.id = 1;

            await lineController.deleteLine(req, res);

            expect(lineService.deleteLine).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Line deleted successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            lineService.deleteLine.mockRejectedValue(error);

            await lineController.deleteLine(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting line', error });
        });
    });
});
