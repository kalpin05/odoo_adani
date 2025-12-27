const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const userRoutes = require('./routes/userRoutes');

// Initialize Express
const app = express();

// 1. Global Middleware
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json()); // Parses incoming JSON requests

// 2. Route Middlewares
// This prefixes all user routes with /api/users
app.use('/api/users', userRoutes);

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