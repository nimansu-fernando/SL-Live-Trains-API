const express = require('express');
const router = express.Router();
const lineRouteController = require('../controllers/line-route-controller');

router.get('/', lineRouteController.getAllLineRoutes);
router.get('/:line_code/:route_key', lineRouteController.getLineRoute);
router.post('/', lineRouteController.createLineRoute);
router.put('/:line_code/:route_key', lineRouteController.updateLineRoute);
router.delete('/:line_code/:route_key', lineRouteController.deleteLineRoute);

module.exports = router;
