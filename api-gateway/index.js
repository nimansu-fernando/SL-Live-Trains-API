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
    origin: 'http://localhost:3007',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(logRequests);

const applySecurity = (req, res, next) => {
    console.log(`Request path: ${req.path}`);
    
    // these needs public token
    const publicTokenRoutes = [
        '/api/location/train-locations/data',
        '/api/location/train-locations/filter-trains',
        '/api/railway-infrastructure/stations/names/order'
    ];

    // unprotected
    const unprotectedRoutes = [
        '/api/data-ingestion/ingestion/ingest',
        '/api/location/train-locations/',
        '/api/user/auth/register',
        '/api/user/auth/login'
    ];

    if (publicTokenRoutes.includes(req.path)) {
        const token = req.headers['x-public-token'];

        if (token === process.env.PUBLIC_API_TOKEN) {
            console.log(`Valid public token provided for ${req.path}`);
            return next(); 
        } else {
            console.log(`Invalid or missing public token for ${req.path}`);
            return res.status(403).json({ message: 'Forbidden: Invalid or missing public token' });
        }
    }

    if (unprotectedRoutes.includes(req.path)) {
        console.log(`Unprotected route: ${req.path}`);
        return next(); 
    }

    console.log(`Protected route: ${req.path}`);
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
