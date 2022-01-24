const User = require('../models/user');
const Message = require('../models/message');

const connectedUser = async (uid) => {
	try {
		const user = await User.findById(uid);

		user.online = true;

		user.save();

		return user;
	} catch (error) {
		console.log(error);
	}
};

const disconnectUser = async (user) => {
	try {
		user.online = false;

		await user.save();
	} catch (error) {
		console.log(error);
	}
};

const getUsers = async () => {
	const users = User.find().sort('-online');
	return users;
};

const saveMessages = async (data) => {
	try {
		const message = Message(data);
		await message.save();
		return message;
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = {
	connectedUser,
	disconnectUser,
	getUsers,
	saveMessages,
};
