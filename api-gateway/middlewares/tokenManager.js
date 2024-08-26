const crypto = require('crypto');
require('dotenv').config();

let currentToken = process.env.PUBLIC_API_TOKEN;
const rotationInterval = process.env.TOKEN_ROTATION_INTERVAL; 

const rotateToken = () => {
    currentToken = crypto.randomUUID();
    console.log(`New token generated: ${currentToken}`);
};

const getCurrentToken = () => currentToken;

setInterval(rotateToken, rotationInterval);

module.exports = { getCurrentToken };
