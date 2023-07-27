require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { limiter } = require('./middlewares/limiter');
const { centralizedErrorHandling } = require('./middlewares/centralizedErrorHandling');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { PORT, MONGODB_URL } = require('./utils/constants');

mongoose.set('strictQuery', true);
const app = express();

const options = {
  origin: [
    'http://kinomovies.nomoreparties.sbs',
    'https://kinomovies.nomoreparties.sbs',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',

  ],
  methods: ['GET', 'PUT', 'HEAD', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

app.use('*', cors(options));

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandling);
app.listen(PORT);
