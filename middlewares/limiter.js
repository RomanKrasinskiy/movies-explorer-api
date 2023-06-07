const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
