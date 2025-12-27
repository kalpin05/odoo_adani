const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

// Using the requirements from your prompt
router.get('/', verifyToken, authorizeRole(['ADMIN', 'MANAGER']), userController.getAllUsers);
router.patch('/:userId', verifyToken, authorizeRole(['ADMIN']), userController.updateUser);
router.delete('/:userId', verifyToken, authorizeRole(['ADMIN']), userController.deactivateUser);

module.exports = router;