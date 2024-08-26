const express = require('express');
const router = express.Router();
const tokenManager = require('../middlewares/tokenManager');

router.get('/', (req, res) => {
    const currentToken = tokenManager.getCurrentToken();
    res.json({ token: currentToken });
});

module.exports = router;
