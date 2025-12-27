const pool = require('../config/db');

// 2.1 GET /users - Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const query = 'SELECT id, name, email, role FROM users ORDER BY id ASC';
    const { rows } = await pool.query(query);
    
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
    const query = `
      UPDATE users 
      SET name = COALESCE($1, name), 
          email = COALESCE($2, email), 
          role = COALESCE($3, role) 
      WHERE id = $4 
      RETURNING id, name, email, role`;
    
    const { rows } = await pool.query(query, [name, email, role, userId]);

    if (rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { user: rows[0] }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2.3 DELETE /users/:userId - Deactivate/Delete user
exports.deactivateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Note: The provided SQL doesn't have an 'is_active' column.
    // If you want a hard delete:
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    res.status(204).send(); // 204 No Content for successful deletion
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

