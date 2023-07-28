const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const { OK, CREATED } = require('../answersServer/success');
const BadRequestError = require('../answersServer/customsErrors/BadRequestError');
const ConflictError = require('../answersServer/customsErrors/ConflictError');
const NotFoundError = require('../answersServer/customsErrors/NotFoundError');
const UnauthorizedError = require('../answersServer/customsErrors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../utils/constants');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с id: ${req.user._id} не найден`);
      }
      return res.status(OK).send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Невалидный id пользователя'));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким Email уже существует'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(CREATED).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким Email уже существует'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let userId;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      const token = jwt.sign(
        { _id: userId },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        { expiresIn: '7d' },
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
      // аутентификация успешна
        .send({ token });
    })
    .catch((err) => next(err));
};

const signout = (req, res, next) => {
  try {
    res.status(OK).clearCookie('jwt', {
      sameSite: 'none',
      secure: true,
    }).send({ message: 'Вы разлогинились!' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
  signout,
};
