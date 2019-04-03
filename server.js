express = require('express');
helmet = require('helmet');

server = express();

// Middleware
server.use(express.json());
server.use(helmet());

// Routing

export default server;