const jwt = require('jsonwebtoken');
const validateToken = (req, res, next) => {
	try {
		const token = req.header('x-token');

		if (!token) {
			return res.status(401).json({
				ok: false,
				msg: 'Do not find any token in the request',
			});
		}

		const { uid } = jwt.verify(token, process.env.JWT_KEY);

		req.uid = uid;

		next();
	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: 'Invalid token',
		});
	}
};
module.exports = {
	validateToken,
};
