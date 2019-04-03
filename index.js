// Load environment variables if we're not in `production`
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

server = require('./server');

port = process.env.PORT;

server.listen(port, () =>
  console.log(`\n*** Server Running on Port ${port}! ***\n`)
);
