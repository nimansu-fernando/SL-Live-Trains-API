const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15m
    max: 500, // limit each ip to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

module.exports = rateLimiter;
