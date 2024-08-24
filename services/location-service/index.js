require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db-config');
const locationRoutes = require('./routes/location-routes');

connectDB();

app.use(express.json());
app.use('/api', locationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Location Service running on port ${PORT}`);
});
