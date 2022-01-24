const jwt = require('jsonwebtoken');

const jwtGenerator = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(
			payload,
			process.env.JWT_KEY,
			{
				expiresIn: '240h',
			},
			(error, token) => {
				if (error) {
					reject(error);
				} else {
					resolve(token);
				}
			}
		);
	});
};

const verifyJWT = (token) => {
	try {
		const { uid } = jwt.verify(token, process.env.JWT_KEY);
		return [true, uid];
	} catch (error) {
		return [false, null];
	}
};

module.exports = {
	jwtGenerator,
	verifyJWT,
};
