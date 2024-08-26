const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config/api-gateway-config');

const router = express.Router();

router.use('/', createProxyMiddleware({ target: config.SERVICE_URLS.DATA_INGESTION, changeOrigin: true }));

module.exports = router;
