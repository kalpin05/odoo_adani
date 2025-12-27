// 1.1 POST /auth/login
exports.loginUser = (req, res) => {
  const { email } = req.body;

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    data: {
      token: 'mock-jwt-token',
      user: {
        id: 1,
        email,
        role: 'MANAGER'
      }
    }
  });
};

// 1.2 POST /auth/register
exports.registerUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: {
      user: req.body
    }
  });
};

// 1.3 GET /auth/me
exports.getMe = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      id: 1,
      name: 'Mock User',
      email: 'user@gearguard.com',
      role: 'TECHNICIAN'
    }
  });
};
