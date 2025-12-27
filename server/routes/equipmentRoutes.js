const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

// 4.1 POST /equipment - ADMIN, MANAGER
router.post('/', verifyToken, authorizeRole(['ADMIN', 'MANAGER']), equipmentController.createEquipment);

// 4.2 GET /equipment - All Authenticated Users
router.get('/', verifyToken, equipmentController.getAllEquipment);

// 4.3 GET /equipment/:equipmentId - All Authenticated Users
router.get('/:equipmentId', verifyToken, equipmentController.getEquipmentById);

// 4.4 GET /equipment/:equipmentId/maintenance-requests - All Authenticated Users
router.get('/:equipmentId/maintenance-requests', verifyToken, equipmentController.getEquipmentMaintenance);

module.exports = router;