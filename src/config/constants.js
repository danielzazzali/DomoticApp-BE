const Routes = {
    LIGHTS: '/lights',
    LIGHTS_BY_NAME: '/lights/:name',
}

const SqlFiles = {
    CHECK_LIGHTS_TABLE: 'src/migrations/queries/checkLightsTable.sql',
    CREATE_LIGHTS_TABLE: 'src/migrations/queries/createLightsTable.sql',
    GET_LIGHTS: 'src/migrations/queries/getLights.sql',
    INSERT_LIGHT: 'src/migrations/queries/insertLight.sql',
    DELETE_LIGHT: 'src/migrations/queries/deleteLight.sql',
    UPDATE_LIGHT: 'src/migrations/queries/updateLight.sql',
}


module.exports = {
    Routes,
    SqlFiles
}