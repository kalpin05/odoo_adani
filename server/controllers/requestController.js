// 5.1 Create corrective or preventive request
exports.createRequest = async (req, res) => {
  const { subject, request_type, equipment_id, team_id } = req.body;
  try {
    // Mock create
    res.status(201).json({ status: 'success', data: { request: { id: Date.now(), subject, request_type, equipment_id, team_id, stage: 'new' } } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5.2 List all requests
exports.getAllRequests = async (req, res) => {
  try {
    // Mock data
    const rows = [
      {
        id: 1,
        subject: 'Hydraulic leak in Press G3',
        request_type: 'corrective',
        stage: 'in_progress',
        scheduled_date: '2024-12-20',
        equipment_name: 'Hydraulic Press G3',
        team_name: 'Hydraulics Maintenance Team',
        technician_name: 'John Doe'
      }
    ];
    res.status(200).json({ status: 'success', results: rows.length, data: { requests: rows } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5.3 Assign Technician
exports.assignTechnician = async (req, res) => {
  const { id } = req.params;
  const { technician_id } = req.body;
  try {
    // Mock assign
    res.status(200).json({ status: 'success', data: { request: { id, technician_id } } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5.4 Move to In Progress
exports.startWork = async (req, res) => {
  const { id } = req.params;
  try {
    // Mock start
    res.status(200).json({ status: 'success', data: { request: { id, stage: 'in_progress' } } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5.5 Mark as Repaired with Duration
exports.completeWork = async (req, res) => {
  const { id } = req.params;
  const { duration } = req.body;
  try {
    // Mock complete
    res.status(200).json({ status: 'success', data: { request: { id, stage: 'repaired', duration } } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5.6 Scrap Request
exports.scrapEquipment = async (req, res) => {
  const { id } = req.params;
  try {
    // Mock scrap
    res.status(200).json({ status: 'success', data: { request: { id, stage: 'scrap' } } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};