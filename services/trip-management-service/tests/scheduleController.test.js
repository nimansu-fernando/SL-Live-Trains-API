const scheduleController = require('../controllers/schedule-controller');
const scheduleService = require('../services/schedule-service');

jest.mock('../services/schedule-service');

describe('Schedule Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('getAllSchedules', () => {
        it('should return all schedules', async () => {
            const schedules = [{ id: 1, schedule_name: 'Schedule1' }, { id: 2, schedule_name: 'Schedule2' }];
            scheduleService.getAllSchedules.mockResolvedValue([schedules]);

            await scheduleController.getAllSchedules(req, res);

            expect(scheduleService.getAllSchedules).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(schedules);
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            scheduleService.getAllSchedules.mockRejectedValue(error);

            await scheduleController.getAllSchedules(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving schedules', error });
        });
    });

    describe('getScheduleById', () => {
        it('should return the schedule if found', async () => {
            const schedule = { id: 1, schedule_name: 'Schedule1' };
            req.params.id = 1;
            scheduleService.getScheduleById.mockResolvedValue([[schedule]]);

            await scheduleController.getScheduleById(req, res);

            expect(scheduleService.getScheduleById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(schedule);
        });

        it('should return 404 if schedule not found', async () => {
            req.params.id = 1;
            scheduleService.getScheduleById.mockResolvedValue([[]]);

            await scheduleController.getScheduleById(req, res);

            expect(scheduleService.getScheduleById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Schedule not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            scheduleService.getScheduleById.mockRejectedValue(error);

            await scheduleController.getScheduleById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving schedule', error });
        });
    });

    describe('createSchedule', () => {
        it('should create a new schedule', async () => {
            const newSchedule = { schedule_name: 'New Schedule' };
            req.body = newSchedule;
            const result = { insertId: 1 };
            scheduleService.createSchedule.mockResolvedValue(result);

            await scheduleController.createSchedule(req, res);

            expect(scheduleService.createSchedule).toHaveBeenCalledWith(newSchedule);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, ...newSchedule });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            scheduleService.createSchedule.mockRejectedValue(error);

            await scheduleController.createSchedule(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating schedule', error });
        });
    });

    describe('updateSchedule', () => {
        it('should update an existing schedule', async () => {
            req.params.id = 1;
            req.body = { schedule_name: 'Updated Schedule' };

            await scheduleController.updateSchedule(req, res);

            expect(scheduleService.updateSchedule).toHaveBeenCalledWith(1, req.body);
            expect(res.json).toHaveBeenCalledWith({ message: 'Schedule updated successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            scheduleService.updateSchedule.mockRejectedValue(error);

            await scheduleController.updateSchedule(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating schedule', error });
        });
    });

    describe('deleteSchedule', () => {
        it('should delete an existing schedule', async () => {
            req.params.id = 1;

            await scheduleController.deleteSchedule(req, res);

            expect(scheduleService.deleteSchedule).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Schedule deleted successfully' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.id = 1;
            scheduleService.deleteSchedule.mockRejectedValue(error);

            await scheduleController.deleteSchedule(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting schedule', error });
        });
    });

    describe('getScheduleDetailsByTripId', () => {
        it('should return schedule details by trip ID if found', async () => {
            const scheduleDetails = [{ id: 1, trip_id: 'T1', schedule_name: 'Schedule1' }];
            req.params.trip_id = 'T1';
            scheduleService.getScheduleDetailsByTripId.mockResolvedValue([scheduleDetails]);

            await scheduleController.getScheduleDetailsByTripId(req, res);

            expect(scheduleService.getScheduleDetailsByTripId).toHaveBeenCalledWith('T1');
            expect(res.json).toHaveBeenCalledWith(scheduleDetails);
        });

        it('should return 404 if schedule details not found', async () => {
            req.params.trip_id = 'T1';
            scheduleService.getScheduleDetailsByTripId.mockResolvedValue([[]]);

            await scheduleController.getScheduleDetailsByTripId(req, res);

            expect(scheduleService.getScheduleDetailsByTripId).toHaveBeenCalledWith('T1');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Schedule not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Something went wrong');
            req.params.trip_id = 'T1';
            scheduleService.getScheduleDetailsByTripId.mockRejectedValue(error);

            await scheduleController.getScheduleDetailsByTripId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving schedule details', error });
        });
    });
});
