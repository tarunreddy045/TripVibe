const express = require('express');
const authRoutes = require('./authRoutes');
const tripRoutes = require('./tripRoutes');
const placesRoutes = require('./placesRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);
router.use('/services', placesRoutes);
router.get('/health', (req, res) => {
  res.json({ ok: true, message: 'TripVibe API is running.' });
});

module.exports = router;
