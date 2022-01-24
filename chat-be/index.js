// Server Model: express + socket.io config
const Server = require('./models/server');

// Package to use the .env
require('dotenv').config();

// Init server instance
const server = new Server();

// Execute the instance
server.execute();
