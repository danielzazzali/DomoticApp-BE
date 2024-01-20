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

module.exports = {
    getDatabaseUrl,
    getIpAddress,
    getPort,
    getVersion
}