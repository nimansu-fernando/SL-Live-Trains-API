const express = require('express');
const app = express();
const port = 3000;

// json parse middleware
app.use(express.json());

// basic test get route, for now ...
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to SL Live Trains' });
});

// server start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});