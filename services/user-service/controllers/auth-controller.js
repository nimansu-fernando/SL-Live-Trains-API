const authService = require('../services/auth-service');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const token = await authService.login(username, password);
    if (token) {
      return res.status(200).json({ token });
    }
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = await authService.register(username, password);
    if (result) {
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(400).json({ message: 'Registration failed' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
