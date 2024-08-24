require('dotenv').config();

const securityConfig = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
  SALT_ROUNDS: 10,
};

module.exports = securityConfig;
