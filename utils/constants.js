const REGEX_URL = /https?:\/\/w{0,3}?[a-z0-9-]{1,}\..+#?/i;

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const JWT_SECRET_DEV = 'secret-key';
const options = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://kinomovies.nomoreparties.sbs',
    'https://kinomovies.nomoreparties.sbs',
  ],
  methods: ['GET', 'PUT', 'HEAD', 'PATCH', 'POST', 'DELETE'],
  // preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

module.exports = {
  REGEX_URL,
  MONGODB_URL,
  PORT,
  JWT_SECRET_DEV,
  options,
};
