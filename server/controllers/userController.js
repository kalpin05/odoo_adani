const pool = require('../config/db');

// 2.1 GET /users - Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    // Mock users
    const rows = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'technician' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' }
    ];
    
    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: { users: rows }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2.2 PATCH /users/:userId - Update user info or role
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, role } = req.body;

  try {
    // Mock update
    res.status(200).json({
      status: 'success',
      data: { user: { id: userId, name, email, role } }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2.3 DELETE /users/:userId - Deactivate/Delete user
exports.deactivateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Mock deactivate
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};