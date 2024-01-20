const express = require('express');
const controller = require("../controller/controller");
const app = express();
const config = require('../config/config');

function configureRoutes(app) {
    app.use(express.json());
    app.use('/', controller);

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
}

function startServer() {
    configureRoutes(app);

    const port = config.getPort();
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
}

module.exports = {
    start: startServer,
};
