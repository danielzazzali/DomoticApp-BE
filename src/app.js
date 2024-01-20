const server = require('./server/server');
const db = require('./database/database');

// db connection
db.connect();

// init server
server.start();