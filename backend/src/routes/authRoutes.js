const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { jwtSecret } = require('../config/env');
const pool = require('../config/db');

const router = express.Router();
const inMemoryUsers = [];

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role || 'user' }, jwtSecret, { expiresIn: '7d' });
}

async function findUserByEmail(email) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  } catch (error) {
    const match = inMemoryUsers.find((user) => user.email === email);
    return match || null;
  }
}

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      try {
        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
          return res.status(409).json({ message: 'User already exists.' });
        }
      } catch (dbError) {
        if (inMemoryUsers.some((user) => user.email === email)) {
          return res.status(409).json({ message: 'User already exists.' });
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      let user;
      try {
        const [result] = await pool.query(
          'INSERT INTO users (name, email, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
          [name, email, hashedPassword, 'user']
        );
        user = { id: result.insertId, name, email, role: 'user' };
      } catch (dbError) {
        user = { id: Date.now(), name, email, role: 'user', password_hash: hashedPassword };
        inMemoryUsers.push(user);
      }
      return res.status(201).json({
        message: 'User created successfully.',
        token: createToken(user),
        user
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const fallbackUser = await findUserByEmail(email);
      if (!fallbackUser) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const user = fallbackUser;
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
      };

      return res.json({
        message: 'Login successful.',
        token: createToken(safeUser),
        user: safeUser,
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.get('/me', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authentication required.' });

    const decoded = jwt.verify(token, jwtSecret);
    try {
      const [rows] = await pool.query('SELECT id, name, email, role, travel_preferences FROM users WHERE id = ?', [decoded.id]);
      if (!rows.length) return res.status(404).json({ message: 'User not found.' });
      return res.json({ user: rows[0] });
    } catch (dbError) {
      const fallback = inMemoryUsers.find((user) => user.id === decoded.id);
      if (!fallback) return res.status(404).json({ message: 'User not found.' });
      return res.json({ user: { id: fallback.id, name: fallback.name, email: fallback.email, role: fallback.role || 'user' } });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
