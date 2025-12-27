// 6.1 GET calendar data
exports.getMaintenanceCalendar = (req, res) => {
  // Get current date and create dates for this week
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1); // Monday of current week

  const wednesday = new Date(monday);
  wednesday.setDate(monday.getDate() + 2); // Wednesday

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4); // Friday

  res.status(200).json({
    status: 'success',
    data: [
      {
        id: 1,
        equipmentId: 3,
        type: 'preventive',
        scheduledDate: wednesday.toISOString().split('T')[0], // Wednesday of current week
        status: 'SCHEDULED'
      },
      {
        id: 2,
        equipmentId: 1,
        type: 'corrective',
        scheduledDate: friday.toISOString().split('T')[0], // Friday of current week
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
