require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'tripvibe-dev-secret',
  nodeEnv: process.env.NODE_ENV || 'development',
  apiBase: process.env.VITE_API_URL || 'http://localhost:5000/api',
};
