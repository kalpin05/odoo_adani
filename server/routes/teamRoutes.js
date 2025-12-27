const express = require('express');
const router = express.Router();

const teamController = require('../controllers/teamController');

router.post('/', teamController.createTeam);
router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.post('/:id/members', teamController.addTeamMember);
router.get('/:id/members', teamController.getTeamMembers);

module.exports = router;
