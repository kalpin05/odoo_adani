const pool = require('../config/db');

// 3.1 Create maintenance team
exports.createTeam = async (req, res) => {
  const { name } = req.body;
  try {
    const query = 'INSERT INTO gear_team (name) VALUES ($1) RETURNING *';
    const { rows } = await pool.query(query, [name]);

    res.status(201).json({
      status: 'success',
      data: { team: rows[0] }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 3.2 List all maintenance teams
exports.getAllTeams = async (req, res) => {
  try {
    // Joining with gear_team_members to potentially count members or list them
    const query = `
      SELECT t.id, t.name, COUNT(m.user_id) as member_count 
      FROM gear_team t
      LEFT JOIN gear_team_members m ON t.id = m.team_id
      GROUP BY t.id
      ORDER BY t.id ASC`;
    
    const { rows } = await pool.query(query);

    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: { teams: rows }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 3.3 Add technician to team
exports.addTeamMember = async (req, res) => {
  const { teamId } = req.params;
  const { userId } = req.body;

  try {
    // Insert into the join table gear_team_members
    const query = 'INSERT INTO gear_team_members (team_id, user_id) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [teamId, userId]);

    res.status(201).json({
      status: 'success',
      message: 'Member added to team successfully',
      data: { assignment: rows[0] }
    });
  } catch (error) {
    // Handle unique constraint violation (if user already in team)
    if (error.code === '23505') {
      return res.status(400).json({ status: 'fail', message: 'User is already a member of this team' });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};