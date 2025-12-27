// 6.1 GET calendar data
exports.getMaintenanceCalendar = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: [
      {
        id: 1,
        equipmentId: 3,
        type: 'preventive',
        scheduledDate: '2025-02-15',
        status: 'SCHEDULED'
      }
    ]
  });
};

// 6.2 POST schedule preventive maintenance
exports.createPreventiveMaintenance = (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Preventive maintenance scheduled',
    data: {
      maintenance: req.body
    }
  });
};
