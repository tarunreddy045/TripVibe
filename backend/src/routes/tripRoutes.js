const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const aiService = require('../services/aiService');
const { demoDestinations } = require('../data/demoData');

const router = express.Router();

const trips = [];

router.get('/destinations', (req, res) => {
  res.json({ destinations: demoDestinations });
});

router.get('/destinations/:id', (req, res) => {
  const destination = demoDestinations.find((item) => item.id === req.params.id || item.name.toLowerCase() === req.params.id.toLowerCase());
  if (!destination) return res.status(404).json({ message: 'Destination not found.' });
  return res.json({ destination });
});

router.post(
  '/generate',
  [
    body('destination').notEmpty().withMessage('Destination is required.'),
    body('budget').notEmpty().withMessage('Budget is required.'),
    body('travelers').isNumeric().withMessage('Travelers must be numeric.')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const trip = await aiService.generateTrip(req.body);
      const id = `trip-${Date.now()}`;
      const savedTrip = { id, ...trip, createdAt: new Date().toISOString() };
      trips.push(savedTrip);

      return res.json({ trip: savedTrip });
    } catch (error) {
      return next(error);
    }
  }
);

router.get('/', authenticateToken, (req, res) => {
  return res.json({ trips });
});

router.get('/:id', authenticateToken, (req, res) => {
  const trip = trips.find((item) => item.id === req.params.id);
  if (!trip) return res.status(404).json({ message: 'Trip not found.' });
  return res.json({ trip });
});

router.put('/:id', authenticateToken, (req, res) => {
  const tripIndex = trips.findIndex((item) => item.id === req.params.id);
  if (tripIndex === -1) return res.status(404).json({ message: 'Trip not found.' });
  trips[tripIndex] = { ...trips[tripIndex], ...req.body, updatedAt: new Date().toISOString() };
  return res.json({ trip: trips[tripIndex] });
});

router.delete('/:id', authenticateToken, (req, res) => {
  const tripIndex = trips.findIndex((item) => item.id === req.params.id);
  if (tripIndex === -1) return res.status(404).json({ message: 'Trip not found.' });
  trips.splice(tripIndex, 1);
  return res.json({ message: 'Trip deleted.' });
});

router.post('/:id/optimize', authenticateToken, async (req, res, next) => {
  try {
    const trip = trips.find((item) => item.id === req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found.' });

    const optimized = {
      ...trip,
      budget: { ...trip.budget, accommodation: Math.max(3000, trip.budget.accommodation - 1000), transport: Math.max(1500, trip.budget.transport - 800) },
      summary: 'Budget optimized while keeping the itinerary aligned to your main interests.',
      tips: [...(trip.tips || []), 'Switched to affordable lodging and public transport options.']
    };

    const tripIndex = trips.findIndex((item) => item.id === req.params.id);
    trips[tripIndex] = optimized;
    return res.json({ trip: optimized });
  } catch (error) {
    return next(error);
  }
});

router.post('/ai/chat', async (req, res) => {
  const { context, message } = req.body;
  const answer = await aiService.chat(context, message);
  return res.json({ answer });
});

module.exports = router;
