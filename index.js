// Load environment variables if we're not in `production`
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

server = require('./server').default;

port = process.env.PORT;

server.listen(port, () =>
  console.log(`\n*** Server Running on Port ${port}! ***\n`)
);
