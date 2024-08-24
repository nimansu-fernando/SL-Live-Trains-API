const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const db = require('../user-service/config/db-config');

app.use(express.json());

app.use('/auth', authRoutes);

db.getConnection()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
