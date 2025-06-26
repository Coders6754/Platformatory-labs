const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');

// Login route
router.get('/login', (req, res) => {
  res.oidc.login({ returnTo: '/api/auth/callback' });
});

// Logout route
router.get('/logout', (req, res) => {
  res.oidc.logout({ returnTo: '/' });
});

// User info route - get current authenticated user
router.get('/user', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: req.oidc.user
    });
  } else {
    res.json({
      isAuthenticated: false,
      user: null
    });
  }
});

module.exports = router; 