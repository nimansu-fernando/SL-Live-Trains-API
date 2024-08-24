const express = require('express');
const connectDB = require('./config/db-config');
const ingestionRoutes = require('./routes/ingestion-routes');
require('dotenv').config();

const app = express();

connectDB();
app.use(express.json());

app.use('/ingestion', ingestionRoutes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Data Ingestion Service running on port ${PORT}`);
});
