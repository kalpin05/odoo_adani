const pool = require('../config/db');

// 5.1 Create corrective or preventive request
exports.createRequest = async (req, res) => {
  const { subject, request_type, equipment_id, team_id } = req.body;
  try {
    const query = `
      INSERT INTO gear_request (subject, request_type, equipment_id, team_id, stage) 
      VALUES ($1, $2, $3, $4, 'new') RETURNING *`;
    const { rows } = await pool.query(query, [subject, request_type, equipment_id, team_id]);
    res.status(201).json({ status: 'success', data: { request: rows[0] } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5.2 List all requests
exports.getAllRequests = async (req, res) => {
  try {
    const query = 'SELECT * FROM gear_request ORDER BY id DESC';
    const { rows } = await pool.query(query);
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
    const query = 'UPDATE gear_request SET technician_id = $1 WHERE id = $2 RETURNING *';
    const { rows } = await pool.query(query, [technician_id, id]);
    res.status(200).json({ status: 'success', data: { request: rows[0] } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5.4 Move to In Progress
exports.startWork = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE gear_request SET stage = 'in_progress' WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(query, [id]);
    res.status(200).json({ status: 'success', data: { request: rows[0] } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5.5 Mark as Repaired with Duration
exports.completeWork = async (req, res) => {
  const { id } = req.params;
  const { duration } = req.body; // duration is double precision in your SQL
  try {
    const query = "UPDATE gear_request SET stage = 'repaired', duration = $1 WHERE id = $2 RETURNING *";
    const { rows } = await pool.query(query, [duration, id]);
    res.status(200).json({ status: 'success', data: { request: rows[0] } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 5.6 Scrap Request
exports.scrapEquipment = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE gear_request SET stage = 'scrap' WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(query, [id]);
    res.status(200).json({ status: 'success', data: { request: rows[0] } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};