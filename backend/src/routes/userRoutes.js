const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../config/auth');

// Get current user profile - requires authentication
router.get('/profile', isAuthenticated, userController.getUserProfile);

// Update user profile - requires authentication
router.put('/profile', isAuthenticated, userController.updateUserProfile);

// Check workflow status - requires authentication
router.get('/workflow/:workflowId', isAuthenticated, userController.checkWorkflowStatus);

module.exports = router; 