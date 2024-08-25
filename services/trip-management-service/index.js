const express = require('express');
const app = express();
const tripRoutes = require('./routes/trip-routes');
const scheduleRoutes = require('./routes/schedule-routes');
const tripStationRoutes = require('./routes/trip-station-routes');
require('dotenv').config();

app.use(express.json());
app.use('/trips', tripRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/trip-stations', tripStationRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Trip Management Service running on port ${PORT}`);
});
