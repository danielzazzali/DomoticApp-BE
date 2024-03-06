const LightsService = require('./lightsService');


async function getLights() {
    return LightsService.getLights()
}

async function addLight(body) {
    return await LightsService.addLight(body.id, body.key, body.name, body.isOn, body.mode, body.brightness, body.colorTemperature)
}

async function updateLight(body) {
    const { name, newName, isOn, mode, brightness, colorTemperature } = body;
    return LightsService.updateLight(name, newName, isOn, mode, brightness, colorTemperature);
}

async function findLightByName(name) {
    return LightsService.findLightByName(name);
}

async function deleteLight(name) {
    return LightsService.deleteLight(name);
}

module.exports = {
    getLights,
    addLight,
    updateLight,
    findLightByName,
    deleteLight
};