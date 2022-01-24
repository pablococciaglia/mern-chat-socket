const { Router } = require('express');
const { check } = require('express-validator');
const {
	createUser,
	login,
	refreshToken,
} = require('../controllers/auth.controller');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateToken } = require('../middlewares/validate-token');

const router = Router();

// Create new user
router.post(
	'/new',
	[
		check('name', 'The name is required').not().isEmpty(),
		check('name', 'The name is required').isString(),
		check('email', 'The name is not in a valid format').not().isEmpty(),
		check('email', 'The email is not in a valid format').isString(),
		check('email', 'Is not valid a valid email ').isEmail(),
		check('password', 'The password is required').not().isEmpty(),
		check('password', 'The password is not in a valid format').isString(),
		check(
			'password',
			'The password should have at least 8 characters'
		).isLength({
			min: 8,
		}),
		fieldValidator,
	],
	createUser
);

// User login
router.post(
	'/login',
	[
		check('email', 'The email is required').not().isEmpty(),
		check('email', 'Is not valid a valid email ').isEmail(),
		check('password', 'The password is required').not().isEmpty(),
		check(
			'password',
			'The password should have at least 8 characters'
		).isLength({
			min: 8,
		}),
		fieldValidator,
	],
	login
);

// Refesh token
router.get('/refresh', [validateToken], refreshToken);

module.exports = router;
