const scheduleModel = require('../models/schedule-model');

const getAllSchedules = () => {
    return scheduleModel.getAllSchedules();
};

const getScheduleById = (id) => {
    return scheduleModel.getScheduleById(id);
};

const createSchedule = (schedule) => {
    return scheduleModel.createSchedule(schedule);
};

const updateSchedule = (id, schedule) => {
    return scheduleModel.updateSchedule(id, schedule);
};

const deleteSchedule = (id) => {
    return scheduleModel.deleteSchedule(id);
};

module.exports = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
};
