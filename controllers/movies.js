const mongoose = require('mongoose');
const Movie = require('../models/movieSchema');
const { OK, CREATED } = require('../answersServer/success');
const BadRequestError = require('../answersServer/customsErrors/BadRequestError');
const NotFoundError = require('../answersServer/customsErrors/NotFoundError');
const ForbiddenError = require('../answersServer/customsErrors/ForbiddenError');

module.exports.getUserMovies = (req, res, next) => {
  const { _id: owner } = req.user;
  Movie.find({ owner })
    .populate(['owner'])
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

module.exports.createCardMovie = (req, res, next) => {
  const { _id: owner } = req.user;
  Movie.create({ ...req.body, owner })
    .then((movie) => movie.populate(['owner']).then(() => res.status(CREATED).send(movie)))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка с таким таким id не найдена.');
      } else if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку.');
      }
      return movie.deleteOne();
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданы некорректные данные.'));
        return;
      }
      next(err);
    });
};
