const express = require('express');
const router = express.Router();

const {
  loginUser,
  registerUser,
  getMe
} = require('../controllers/auth.controller');

// NOTE: JWT & role middleware will be added later

// 1.1 Login
router.post('/login', loginUser);

// 1.2 Register new user (ADMIN, MANAGER)
router.post('/register', registerUser);

// 1.3 Get logged-in user details
router.get('/me', getMe);

module.exports = router;
