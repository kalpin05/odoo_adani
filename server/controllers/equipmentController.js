// server/controllers/equipmentController.js

// Mock data storage
let mockEquipment = [
  {
    id: 1,
    name: 'Hydraulic Press G3',
    serial_no: 'HYD-999',
    location: 'Sector 7',
    department: 'Production'
  }
];

const getAllEquipment = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: mockEquipment
  });
};

const getEquipmentById = (req, res) => {
  const equipment = mockEquipment.find(eq => eq.id == req.params.id);
  if (!equipment) {
    return res.status(404).json({ status: 'error', message: 'Equipment not found' });
  }

  res.status(200).json({
    status: 'success',
    data: equipment
  });
};

const createEquipment = (req, res) => {
  const { name, employee, category, technician, company } = req.body;

  const newEquipment = {
    id: Date.now(),
    name: name || 'New Equipment',
    serial_no: `EQ-${Date.now()}`,
    location: 'New Location',
    department: category || 'General',
    employee: employee || '-',
    technician: technician || '-',
    company: company || '-'
  };

  mockEquipment.push(newEquipment);

  res.status(201).json({
    status: 'success',
    message: 'Equipment created successfully',
    data: newEquipment
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
  getMaintenanceRequestsByEquipment,
  mockEquipment
};
