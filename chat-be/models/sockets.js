const {
	connectedUser,
	disconnectUser,
	getUsers,
	saveMessages,
} = require('../controllers/sockets.controller');
const { verifyJWT } = require('../helpers/jwt');

class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on('connection', async (socket) => {
			const [valid, uid] = verifyJWT(socket.handshake.query['x-token']);

			// Verify if the client has a valid token
			if (!valid) {
				return socket.disconnect();
			}

			const user = await connectedUser(uid);

			// Set the user offline on DB
			socket.on('disconnect', async () => {
				await disconnectUser(user);
				this.io.emit('user-list', await getUsers());
			});

			// Join a specific socket to a chat room
			socket.join(uid);

			// Emit events
			this.io.emit('user-list', await getUsers());

			socket.on('personal-message', async (payload) => {
				const message = await saveMessages(payload);
				this.io.to(payload.to).emit('personal-message', message);
				this.io.to(payload.from).emit('personal-message', message);
			});
		});
	}
}

module.exports = Sockets;
