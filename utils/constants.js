const REGEX_URL = /https?:\/\/w{0,3}?[a-z0-9-]{1,}\..+#?/i;

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const JWT_SECRET_DEV = 'secret-key';

module.exports = {
  REGEX_URL,
  MONGODB_URL,
  PORT,
  JWT_SECRET_DEV,
};
