const { Pool } = require('pg');
const createLightsTable = require("../migrations/createLightsTable");
const config = require('../config/config');

class Database {
    constructor() {
        if (!Database.instance) {
            this.pool = new Pool({
                connectionString: config.getDatabaseUrl(),
            });
            this.pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err);
                process.exit(-1);
            });

            Database.instance = this;
        }

        return Database.instance;
    }

    query(text, params) {
        return this.pool.query(text, params);
    }

    connect() {
        this.pool.query('SELECT NOW()', (err, res) => {
            if (err) {
                console.error('Error executing query on the database', err.stack);
            } else {
                console.log('Connected to the database', res.rows[0]);
            }
        });
    }

    /**
     * Migrate the database.
     */
    async migrate() {
        return await createLightsTable(this);
    }
}

const instance = new Database();

instance.migrate().then((res) => {
    console.log(res);
}).catch((err) => {
    console.error(err);
});

Object.freeze(instance);

module.exports = instance;