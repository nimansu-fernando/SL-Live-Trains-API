const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule-controller');

router.get('/', scheduleController.getAllSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.post('/', scheduleController.createSchedule);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);
router.get('/trip/:trip_id', scheduleController.getScheduleDetailsByTripId);

module.exports = router;
