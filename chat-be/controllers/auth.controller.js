const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { jwtGenerator } = require('../helpers/jwt');

const createUser = async (req, res) => {
	try {
		const { password, email } = req.body;

		const isEmail = await User.findOne({ email });

		if (isEmail) {
			return res.status(400).json({
				ok: false,
				msg: 'The email is already registered',
			});
		}

		// Create the instance of the user
		const user = new User(req.body);

		// Encrypt password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		// Save user in database
		await user.save();

		// Generate JWT

		const jwt = await jwtGenerator(user.id);

		res.status(201).json({
			ok: true,
			user,
			jwt,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Server faliure',
		});
	}
};

const login = async (req, res) => {
	try {
		const { password, email } = req.body;

		const user = await User.findOne({ email });

		// Veryfy the email
		if (!user) {
			return res.status(404).json({
				ok: false,
				msg: 'Incorrect user or password',
			});
		}

		// Validate password
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(404).json({
				ok: false,
				msg: 'Incorrect user or password',
			});
		}

		// Generate JWT
		const jwt = await jwtGenerator(user.id);

		res.status(200).json({
			ok: true,
			user,
			jwt,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Server faliure',
		});
	}
};

const refreshToken = async (req, res = response) => {
	const uid = req.uid;

	// Generate new JWT
	const jwt = await jwtGenerator(uid);

	// Get user by UID
	const user = await User.findById(uid);

	res.json({
		ok: true,
		user,
		jwt,
	});
};

module.exports = {
	createUser,
	login,
	refreshToken,
};
