const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route-controller');

router.get('/', routeController.getAllRoutes);
router.get('/:id', routeController.getRouteById);
router.post('/', routeController.createRoute);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRoute);
router.get('/name/:id', routeController.getRouteNameByRouteId);

module.exports = router;
