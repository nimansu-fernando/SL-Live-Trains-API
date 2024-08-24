const express = require('express');
const router = express.Router();
const engineController = require('../controllers/engine-controller');

router.get('/', engineController.getAllEngines);
router.get('/:id', engineController.getEngineById);
router.post('/', engineController.createEngine);
router.put('/:id', engineController.updateEngine);
router.delete('/:id', engineController.deleteEngine);
router.get('/by-device/:device_id', engineController.getEngineNumberByDeviceId);


module.exports = router;
