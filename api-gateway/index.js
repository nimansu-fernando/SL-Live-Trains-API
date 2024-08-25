const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config/api-gateway-config');
const logRequests = require('./middlewares/logging-middleware');
const errorHandler = require('./middlewares/error-handler');
const rateLimiter = require('./config/rate-limiter-config');
const authenticate = require('./middlewares/authentication-middleware');

const railwayInfrastructureRoutes = require('./routes/railway-infrastructure-routes');
const locomotiveManagementRoutes = require('./routes/locomotive-management-routes');
const tripManagementRoutes = require('./routes/trip-management-routes');
const locationRoutes = require('./routes/location-routes');
const dataIngestionRoutes = require('./routes/data-ingestion-routes');
const userRoutes = require('./routes/user-routes');

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3006',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(logRequests);

const applySecurity = (req, res, next) => {
    console.log(`Request path: ${req.path}`);
    const unprotectedRoutes = [
        '/api/data-ingestion/ingestion/ingest',
        '/api/location/train-locations/data',
        '/api/location/train-locations/filter-trains',
        '/api/user/auth/register',
        '/api/user/auth/login'
    ];

    if (unprotectedRoutes.includes(req.path)) {
        return next(); 
    }

    return authenticate(req, res, next);
};

app.use(applySecurity);

app.use('/location/api/locations', rateLimiter);

app.use('/api/railway-infrastructure', railwayInfrastructureRoutes);
app.use('/api/locomotive-management', locomotiveManagementRoutes);
app.use('/api/trip-management', tripManagementRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/data-ingestion', dataIngestionRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
