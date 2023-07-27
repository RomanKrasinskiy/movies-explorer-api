const mongoose = require('mongoose');
const validator = require('validator');
const { REGEX_URL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    valid: {
      validator: validator.isUrl,
    },
    validate: (value) => REGEX_URL.test(value),
  },
  trailerLink: {
    type: String,
    required: true,
    valid: {
      validator: validator.isUrl,
    },
    validate: (value) => REGEX_URL.test(value),
  },
  thumbnail: {
    type: String,
    required: true,
    valid: {
      validator: validator.isUrl,
    },
    validate: (value) => REGEX_URL.test(value),
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
