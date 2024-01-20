async function createLightsTable(db) {
    const checkTableQuery = `
            SELECT EXISTS (
                SELECT FROM 
                    pg_tables
                WHERE 
                    schemaname = 'public' AND 
                    tablename  = 'lights'
            );
    `;

    const createTableQuery = `
            CREATE TABLE lights (
                id INTEGER PRIMARY KEY,
                key VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL UNIQUE,
                is_on BOOLEAN NOT NULL DEFAULT false,
                mode VARCHAR(50) NOT NULL DEFAULT 'white',
                brightness INTEGER NOT NULL CHECK (brightness BETWEEN 10 AND 1000),
                color_temperature INTEGER NOT NULL CHECK (color_temperature BETWEEN 0 AND 1000)
            );
    `;

    try {
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