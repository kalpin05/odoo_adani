const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// 1.1 POST /auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Mock login for now
    if (email === 'admin@example.com' && password === 'Password123!') {
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          token: 'mock-jwt-token',
          user: {
            id: 1,
            email: email,
            role: 'admin',
          },
        },
      });
    } else {
      return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// 1.2 POST /auth/register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if email already exists
    const existing = await pool.query(
      'SELECT id FROM gear_users WHERE email = $1',
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ status: 'fail', message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert user
    const { rows } = await pool.query(
      'INSERT INTO gear_users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role',
      [name, email, password_hash]
    );

    const user = rows[0];

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: { user },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// 1.3 GET /auth/me (mock for now)
exports.getMe = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      id: 1,
      name: 'Mock User',
      email: 'user@gearguard.com',
      role: 'TECHNICIAN',
    },
  });
};