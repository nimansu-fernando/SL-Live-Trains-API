const ingestionService = require('../services/ingestion-service');
const { validateIngestionData } = require('../utils/validation');

const cleanData = (data) => {
  return {
    deviceID: data.deviceID || null,
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    speed: data.speed || 0,
    timestamp: data.timestamp || new Date().toISOString()
  };
};

async function postIngestedData(req, res, next) {
    try {
        const data = cleanData(req.body);

        const { error } = validateIngestionData(data);
        if (error) {
            console.error('Validation failed:', error.message);
            return res.status(400).json({ message: 'Invalid data', error: error.message });
        }

        const result = await ingestionService.ingestData(data);

        res.status(201).json({
            message: 'Data processed successfully',
            data: result
        });
    } catch (error) {
        console.error('Error processing data:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getIngestedData(req, res, next) {
  try {
    const data = await ingestionService.getAllData(); 

    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving data:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  postIngestedData,
  getIngestedData
};
