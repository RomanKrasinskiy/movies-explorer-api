const router = require('express').Router();

const { validatorCreateCardMovie, validatorDeleteMovie } = require('../middlewares/validators');
const { getUserMovies, createCardMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getUserMovies);
router.post('/', validatorCreateCardMovie, createCardMovie);
router.delete('/:movieId', validatorDeleteMovie, deleteMovie);

module.exports = router;
