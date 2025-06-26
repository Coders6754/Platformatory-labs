const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  routes: {
    login: false,
    callback: '/callback'
  }
};

module.exports = {
  auth: auth(config),
  isAuthenticated: (req, res, next) => {
    if (req.oidc.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Authentication required' });
  }
}; 