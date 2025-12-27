const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipmentController');

// ✅ ALWAYS reference via object (bullet-proof)
router.get('/', equipmentController.getAllEquipment);
router.get('/:id', equipmentController.getEquipmentById);
router.post('/', equipmentController.createEquipment);
router.get('/:id/maintenance-requests', equipmentController.getMaintenanceRequestsByEquipment);

module.exports = router;
