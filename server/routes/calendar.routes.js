const express = require('express');
const router = express.Router();

const {
  getMaintenanceCalendar,
  createPreventiveMaintenance
} = require('../controllers/calendar.controller');

// NOTE: Auth / role middleware will be added later

// 6.1 Fetch preventive maintenance calendar
router.get('/maintenance', getMaintenanceCalendar);

// 6.2 Schedule preventive maintenance (MANAGER)
router.post('/maintenance', createPreventiveMaintenance);

module.exports = router;
