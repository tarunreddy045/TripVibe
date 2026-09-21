const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const router = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { port } = require('./config/env');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

app.use('/api', router);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TripVibe backend listening on http://localhost:${port}`);
});
