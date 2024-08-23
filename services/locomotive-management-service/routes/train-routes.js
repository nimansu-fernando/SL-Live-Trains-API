const express = require('express');
const router = express.Router();
const trainController = require('../controllers/train-controller');

router.get('/', trainController.getAllTrains);
router.get('/:id', trainController.getTrainById);
router.post('/', trainController.createTrain);
router.put('/:id', trainController.updateTrain);
router.delete('/:id', trainController.deleteTrain);

module.exports = router;
