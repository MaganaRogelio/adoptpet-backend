const router = require('express').Router();

const {
	createUser,
	getUsers,
	updateUser,
	deleteUser,
	logUser,
} = require('../controllers/users');

const auth = require('./auth');

router.get('/', auth.required, getUsers);
router.get('/:id', auth.required, getUsers);

router.post('/', createUser);

router.post('/enter', logUser);

router.put('/:id', auth.required, updateUser);

router.delete('/:id', auth.required, deleteUser);

module.exports = router;
