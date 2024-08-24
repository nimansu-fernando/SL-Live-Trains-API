const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const securityConfig = require('../config/security-config');
const db = require('../config/db-config');

exports.login = async (username, password) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  
  const [rows] = await db.query(query, [username]);
  
  if (rows.length === 0) {
    return null;
  }

  const user = rows[0];
  
  // Compare password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return null;
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, securityConfig.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

exports.register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, securityConfig.SALT_ROUNDS);
  
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  
  try {
    await db.query(query, [username, hashedPassword]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
