const express = require('express');
const router = express.Router();
const ingestionController = require('../controllers/ingestion-controller');

router.post('/ingest', ingestionController.postIngestedData);

module.exports = router;
