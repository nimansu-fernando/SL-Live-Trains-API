const express = require('express');
const app = express();
const engineRoutes = require('./routes/engine-routes');
const trainRoutes = require('./routes/train-routes');
require('dotenv').config();

app.use(express.json());
app.use('/engines', engineRoutes);
app.use('/trains', trainRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Locomotive Management Service running on port ${PORT}`);
});
