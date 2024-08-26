const scheduleService = require('../services/schedule-service');

exports.getAllSchedules = async (req, res) => {
    try {
        const [rows] = await scheduleService.getAllSchedules();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving schedules', error });
    }
};

exports.getScheduleById = async (req, res) => {
    try {
        const [rows] = await scheduleService.getScheduleById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving schedule', error });
    }
};

exports.createSchedule = async (req, res) => {
    try {
        const result = await scheduleService.createSchedule(req.body);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating schedule', error });
    }
};

exports.updateSchedule = async (req, res) => {
    try {
        await scheduleService.updateSchedule(req.params.id, req.body);
        res.json({ message: 'Schedule updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating schedule', error });
    }
};

exports.deleteSchedule = async (req, res) => {
    try {
        await scheduleService.deleteSchedule(req.params.id);
        res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting schedule', error });
    }
};

exports.getScheduleDetailsByTripId = async (req, res) => {
    try {
        const { trip_id } = req.params;
        const [rows] = await scheduleService.getScheduleDetailsByTripId(trip_id);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving schedule details', error });
    }
};