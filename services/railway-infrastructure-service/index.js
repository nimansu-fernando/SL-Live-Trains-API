const express = require('express');
const app = express();
const lineRoutes = require('./routes/line-routes');
const routeRoutes = require('./routes/route-routes');
const stationRoutes = require('./routes/station-routes');
const lineRouteRoutes = require('./routes/line-route-routes')
require('dotenv').config();

app.use(express.json());
app.use('/lines', lineRoutes);
app.use('/routes', routeRoutes);
app.use('/stations', stationRoutes);
app.use('/line-routes', lineRouteRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Railway Infrastructure Service running on port ${PORT}`);
});
