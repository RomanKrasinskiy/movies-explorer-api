require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
// const cors = require('cors');
const cors = require('./middlewares/cors');
const { limiter } = require('./middlewares/limiter');
const { centralizedErrorHandling } = require('./middlewares/centralizedErrorHandling');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { PORT, MONGODB_URL } = require('./utils/constants');

const app = express();

app.use(cors);
app.use(limiter);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(routes);
app.listen(PORT);
app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandling);
