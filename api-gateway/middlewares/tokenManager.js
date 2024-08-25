const crypto = require('crypto');
require('dotenv').config();

let currentToken = process.env.PUBLIC_API_TOKEN;
const rotationInterval = process.env.TOKEN_ROTATION_INTERVAL || 1800000; // default 30 minutes

const rotateToken = () => {
    currentToken = crypto.randomUUID(); // Generate a new token
    console.log(`New token generated: ${currentToken}`);
};

const getCurrentToken = () => currentToken;

setInterval(rotateToken, rotationInterval);

module.exports = { getCurrentToken };
