// server/controllers/requestController.js
// ⚠️ MOCK CONTROLLER (NO DATABASE USAGE)

// 5.1 Create corrective or preventive request
const createRequest = (req, res) => {
  const { subject, request_type, equipment_id, team_id } = req.body;

  res.status(201).json({
    status: 'success',
    data: {
      request: {
        id: 1,
        subject,
        request_type,
        equipment_id,
        team_id,
        stage: 'new'
      }
    }
  });
};

// 5.2 List all requests
const getAllRequests = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: 1,
    data: {
      requests: [
        {
          id: 1,
          subject: 'Hydraulic Leak - Press 01',
          request_type: 'corrective',
          equipment_id: 1,
          team_id: 2,
          stage: 'new'
        }
      ]
    }
  });
};

// 5.3 Assign Technician
const assignTechnician = (req, res) => {
  const { id } = req.params;
  const { technician_id } = req.body;

  res.status(200).json({
    status: 'success',
    data: {
      request: {
        id,
        technician_id,
        stage: 'assigned'
      }
    }
  });
};

// 5.4 Move to In Progress
const startWork = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    data: {
      request: {
        id,
        stage: 'in_progress'
      }
    }
  });
};

// 5.5 Mark as Repaired with Duration
const completeWork = (req, res) => {
  const { id } = req.params;
  const { duration } = req.body;

  res.status(200).json({
    status: 'success',
    data: {
      request: {
        id,
        duration,
        stage: 'repaired'
      }
    }
  });
};

// 5.6 Scrap Request
const scrapEquipment = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    data: {
      request: {
        id,
        stage: 'scrap'
      }
    }
  });
};

module.exports = {
  createRequest,
  getAllRequests,
  assignTechnician,
  startWork,
  completeWork,
  scrapEquipment
};
