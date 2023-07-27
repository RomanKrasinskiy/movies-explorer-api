const router = require('express').Router();
const { validatorSignUp, validatorSignIn } = require('../middlewares/validators');

const usersRouter = require('./usersRouter');
const moviesRouter = require('./moviesRouter');
const { createUser, login, signout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../answersServer/customsErrors/NotFoundError');

router.post('/signup', validatorSignUp, createUser);
router.post('/signin', validatorSignIn, login);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.delete('/signout', auth, signout);

router.use('/*', auth, (req, res, next) => next(new NotFoundError('По указанному url ничего нет.')));

module.exports = router;
