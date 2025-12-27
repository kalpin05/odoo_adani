const pool = require('../config/db');

// 4.1 Create equipment record
exports.createEquipment = async (req, res) => {
  const { name, serial_no, purchase_date, warranty_date, location, department, team_id } = req.body;
  try {
    const query = `
      INSERT INTO gear_equipment (name, serial_no, purchase_date, warranty_date, location, department, team_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    
    const { rows } = await pool.query(query, [name, serial_no, purchase_date, warranty_date, location, department, team_id]);
    res.status(201).json({ status: 'success', data: { equipment: rows[0] } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 4.2 List equipment with filters (Example: filter by department or location)
exports.getAllEquipment = async (req, res) => {
  try {
    const { department, location } = req.query;
    let query = 'SELECT * FROM gear_equipment WHERE 1=1';
    const params = [];

    if (department) {
      params.push(department);
      query += ` AND department = $${params.length}`;
    }
    if (location) {
      params.push(location);
      query += ` AND location = $${params.length}`;
    }

    const { rows } = await pool.query(query, params);
    res.status(200).json({ status: 'success', results: rows.length, data: { equipment: rows } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 4.3 View specific equipment details
exports.getEquipmentById = async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const query = 'SELECT * FROM gear_equipment WHERE id = $1';
    const { rows } = await pool.query(query, [equipmentId]);

    if (rows.length === 0) return res.status(404).json({ status: 'fail', message: 'Equipment not found' });

    res.status(200).json({ status: 'success', data: { equipment: rows[0] } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 4.4 Smart Button – Fetch related maintenance requests
exports.getEquipmentMaintenance = async (req, res) => {
  try {
    const { equipmentId } = req.params;
    // Join gear_request with gear_equipment
    const query = `
      SELECT r.* FROM gear_request r
      WHERE r.equipment_id = $1
      ORDER BY r.scheduled_date DESC`;
    
    const { rows } = await pool.query(query, [equipmentId]);
    res.status(200).json({ status: 'success', results: rows.length, data: { requests: rows } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};