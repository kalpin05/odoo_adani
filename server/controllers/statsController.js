const equipmentController = require('./equipmentController');

// GET /api/stats
exports.getStats = async (req, res) => {
  try {
    // Get equipment count dynamically
    const equipmentCount = equipmentController.mockEquipment ? equipmentController.mockEquipment.length : 1;

    res.status(200).json({
      status: 'success',
      data: {
        criticalEquipment: Math.max(0, equipmentCount - 1), // Mock critical equipment
        technicianLoad: 75,
        openRequests: 12,
        overdueRequests: 3,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};