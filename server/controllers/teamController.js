// server/controllers/teamController.js
// ⚠️ MOCK CONTROLLER (NO DATABASE)

// Create a new team
const createTeam = (req, res) => {
  const { name } = req.body;

  res.status(201).json({
    status: 'success',
    data: {
      team: {
        id: 1,
        name
      }
    }
  });
};

// Get all teams
const getAllTeams = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: 1,
    data: {
      teams: [
        {
          id: 1,
          name: 'Hydraulics Maintenance Team'
        }
      ]
    }
  });
};

// Get team by ID
const getTeamById = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    data: {
      team: {
        id,
        name: 'Hydraulics Maintenance Team'
      }
    }
  });
};

// Add member to team
const addTeamMember = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  res.status(200).json({
    status: 'success',
    data: {
      team_id: id,
      user_id
    }
  });
};

// Get team members
const getTeamMembers = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    data: {
      team_id: id,
      members: [
        {
          id: 1,
          name: 'John Technician',
          role: 'TECHNICIAN'
        }
      ]
    }
  });
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  addTeamMember,
  getTeamMembers
};
