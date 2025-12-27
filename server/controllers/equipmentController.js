// server/controllers/equipmentController.js

const getAllEquipment = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: [
      {
        id: 1,
        name: 'Hydraulic Press G3',
        serial_no: 'HYD-999',
        location: 'Sector 7',
        department: 'Production'
      }
    ]
  });
};

const getEquipmentById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      id: req.params.id,
      name: 'Hydraulic Press G3',
      serial_no: 'HYD-999',
      location: 'Sector 7',
      department: 'Production'
    }
  });
};

const createEquipment = (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Equipment created (mock)',
    data: req.body
  });
};

const getMaintenanceRequestsByEquipment = (req, res) => {
  const equipmentId = req.params.id;

  res.status(200).json({
    status: 'success',
    data: [
      {
        id: 101,
        equipmentId,
        type: 'corrective',
        status: 'OPEN'
      },
      {
        id: 102,
        equipmentId,
        type: 'preventive',
        status: 'COMPLETED'
      }
    ]
  });
};

// ✅ EXPORT EVERYTHING EXPLICITLY
module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  getMaintenanceRequestsByEquipment
};
