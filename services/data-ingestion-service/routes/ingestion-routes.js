const express = require('express');
const router = express.Router();
const ingestionController = require('../controllers/ingestion-controller');

router.post('/ingest', ingestionController.postIngestedData);
router.get('/data', ingestionController.getIngestedData); 

module.exports = router;
