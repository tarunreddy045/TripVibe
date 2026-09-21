const express = require('express');
const { getWeather } = require('../services/weatherService');

const router = express.Router();

router.get('/weather', async (req, res) => {
  try {
    const destination = req.query.destination || 'Goa';
    const weather = await getWeather(destination);
    res.json({ weather });
  } catch (error) {
    res.status(500).json({ message: 'Weather lookup failed.' });
  }
});

router.get('/places', (req, res) => {
  res.json({ places: ['Baga Beach', 'Charminar', 'Old Manali', 'Munnar'] });
});

module.exports = router;
