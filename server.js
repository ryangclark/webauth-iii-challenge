cors = require('cors');
express = require('express');
helmet = require('helmet');

bouncer = require('../auth/bouncer').default;

authRoutes = require('./auth/auth-routes').default;
userRoutes = require('./users/users-routes');

server = express();

// Universal Middleware
server.use(cors(), express.json(), helmet());

// Routing
server.use('/api/encantado', authRoutes);
server.use('/api/users', bouncer, userRoutes);

export default server;
