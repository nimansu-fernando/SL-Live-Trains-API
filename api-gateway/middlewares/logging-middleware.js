const logger = require('../config/logging-config');

const logRequests = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};

module.exports = logRequests;
