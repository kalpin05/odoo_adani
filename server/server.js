const express = require('express');
const cors = require('cors');
require('dotenv').config();


// Import Routes

const authRoutes = require('./routes/auth.routes');

const userRoutes = require('./routes/userRoutes');

const teamRoutes = require('./routes/teamRoutes');

const equipmentRoutes = require('./routes/equipmentRoutes');

const requestRoutes = require('./routes/requestRoutes');

const calendarRoutes = require('./routes/calendar.routes');

const reportsRoutes = require('./routes/reports.routes');

const statsRoutes = require('./routes/stats.routes');

// Initialize Express
const app = express();

// THIS LINE IS MANDATORY AND MUST BE AT THE TOP
app.use(express.json());    

// 1. Global Middleware
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json()); // Parses incoming JSON requests

app.use(express.urlencoded({ extended: true }));




// 2. Route Middlewares
// This prefixes all user routes with /api/users

app.use('/api/auth', authRoutes);
    
app.use('/api/users', userRoutes);

app.use('/api/teams', teamRoutes);

app.use('/api/equipment', equipmentRoutes);

app.use('/api/maintenance-requests', requestRoutes);

app.use('/api/calendar', calendarRoutes);

app.use('/api/reports', reportsRoutes);

app.use('/api/stats', statsRoutes);

// 3. Root Route (For health check)
app.get('/', (req, res) => {
    res.send('Odoo Hackathon API is running...');
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`--- Senior Backend Engineer Log ---`);
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Database connected to: ${process.env.DB_NAME}`);
    console.log(`----------------------------------`);
});