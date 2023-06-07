const router = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { validatorUpdateUser } = require('../middlewares/validators');

router.get('/me', getUser);
router.patch('/me', validatorUpdateUser, updateUser);

module.exports = router;
