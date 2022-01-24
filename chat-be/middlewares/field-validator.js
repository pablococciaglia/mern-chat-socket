const { validationResult } = require('express-validator');

const fieldValidator = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = errors.mapped();
		const firstKey = Object.keys(error)[0];
		return res.status(400).json({
			ok: false,
			msg: error[firstKey].msg,
		});
	}
	next();
};

module.exports = {
	fieldValidator,
};
