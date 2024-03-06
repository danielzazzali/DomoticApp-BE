const server = require('./server/server');
const db = require('./database/database');

const escomplex = require('escomplex');

// db connection
db.connect();

// init server
server.start();


// handle command line arguments
const args = process.argv.slice(2); // remove the first two elements
console.log(args); // this will print ['src/appjs', 'index.js'] if you run `node app.js src/appjs index.js`