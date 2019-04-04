cors = require('cors');
express = require('express');
helmet = require('helmet');

bouncer = require('./auth/bouncer');
withDepartment = require('./auth/withDepartment-middleware');

authRoutes = require('./auth/auth-routes');
userRoutes = require('./users/users-routes');

server = express();

// Universal Middleware
server.use(cors(), express.json(), helmet());

// Routing
server.use('/api/encantado', authRoutes);
server.use('/api/users', bouncer, withDepartment('Bakery'), userRoutes);

module.exports = server;
