const express = require('express');
const router = express.Router();

const {
  getDashboardKPIs,
  getRequestsByTeam
} = require('../controllers/reports.controller');

// NOTE: Role middleware (MANAGER, ADMIN) will be added later

// 7.1 Dashboard KPIs
router.get('/dashboard', getDashboardKPIs);

// 7.2 Analytics per team
router.get('/requests-by-team', getRequestsByTeam);

module.exports = router;
