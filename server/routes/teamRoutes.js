const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

// 3.1 POST /teams - ADMIN
router.post(
  '/', 
  verifyToken, 
  authorizeRole(['ADMIN']), 
  teamController.createTeam
);

// 3.2 GET /teams - All Authenticated Users
router.get(
  '/', 
  verifyToken, 
  teamController.getAllTeams
);

// 3.3 POST /teams/:teamId/members - ADMIN
router.post(
  '/:teamId/members', 
  verifyToken, 
  authorizeRole(['ADMIN']), 
  teamController.addTeamMember
);

module.exports = router;