const fs = require('fs').promises;
const constants = require('../config/constants');

async function readSqlFile(filePath) {
    try {
        return await fs.readFile(filePath, {encoding: 'utf8'});
    } catch (error) {
        throw new Error(`Error reading the SQL file: ${error.message}`);
    }
}

async function createLightsTable(db) {
    try {
        const checkTableQuery = await readSqlFile(constants.SqlFiles.CHECK_LIGHTS_TABLE);
        const createTableQuery = await readSqlFile(constants.SqlFiles.CREATE_LIGHTS_TABLE);

        const res = await db.query(checkTableQuery);

        if (!res.rows[0].exists) {
            await db.query(createTableQuery);
            return "The 'lights' table was created successfully.";
        } else {
            return "Found 'lights' table.";
        }
    } catch (error) {
        return {message: 'Error during migration:', error: error};
    }
}

module.exports = createLightsTable;