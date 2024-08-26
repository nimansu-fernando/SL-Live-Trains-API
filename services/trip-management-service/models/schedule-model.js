const db = require('../config/db-config');

const getAllSchedules = () => {
    return db.query('SELECT * FROM schedules');
};

const getScheduleById = (id) => {
    return db.query('SELECT * FROM schedules WHERE id = ?', [id]);
};

const createSchedule = (schedule) => {
    return db.query('INSERT INTO schedules SET ?', schedule);
};

const updateSchedule = (id, schedule) => {
    return db.query('UPDATE schedules SET ? WHERE id = ?', [schedule, id]);
};

const deleteSchedule = (id) => {
    return db.query('DELETE FROM schedules WHERE id = ?', [id]);
};

const getScheduleDetailsByTripId = (trip_id) => {
    return db.query(
        'SELECT start_time, end_time, frequency, duration FROM schedules WHERE trip_id = ?',
        [trip_id]
    );
};

module.exports = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getScheduleDetailsByTripId
};
