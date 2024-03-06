require('dotenv').config();

function getDatabaseUrl() {
    return process.env.DATABASE_URL;
}

function getIpAddress() {
    return  process.env.IP_ADDRESS || 'localhost'
}

function getPort() {
    return process.env.PORT || 3000;
}

function getVersion(){
    return process.env.VERSION || 3.3
}

function getDbUser(){
    return process.env.DB_USER;
}

function getDbPassword(){
    return process.env.DB_PASSWORD;
}

function getDbHost(){
    return process.env.DB_HOST;
}

function getDbPort(){
    return process.env.DB_PORT;
}

function getDbName(){
    return process.env.DB_NAME;
}

function getSsl(){
    return process.env.SSL === 'true';
}

module.exports = {
    getDatabaseUrl,
    getIpAddress,
    getPort,
    getVersion,
    getDbUser,
    getDbPassword,
    getDbHost,
    getDbPort,
    getDbName,
    getSsl
}