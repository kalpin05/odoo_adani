const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

// 5.1 POST /maintenance-requests - All users
router.post('/', verifyToken, requestController.createRequest);

// 5.2 GET /maintenance-requests - All authenticated users
router.get('/', verifyToken, requestController.getAllRequests);

// 5.3 PATCH /assign - MANAGER, TECHNICIAN
router.patch('/:id/assign', verifyToken, authorizeRole(['MANAGER', 'TECHNICIAN']), requestController.assignTechnician);

// 5.4 PATCH /start - TECHNICIAN
router.patch('/:id/start', verifyToken, authorizeRole(['TECHNICIAN']), requestController.startWork);

// 5.5 PATCH /complete - TECHNICIAN
router.patch('/:id/complete', verifyToken, authorizeRole(['TECHNICIAN']), requestController.completeWork);

// 5.6 PATCH /scrap - MANAGER, ADMIN
router.patch('/:id/scrap', verifyToken, authorizeRole(['MANAGER', 'ADMIN']), requestController.scrapEquipment);

module.exports = router;