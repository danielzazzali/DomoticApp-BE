const {Light} = require("../model/light");
const LightsService = require('./lightsService');


async function getLights() {
    return LightsService.getLights()
}

async function addLight(id, key, name, isOn, mode, brightness, colorTemperature) {
    return LightsService.addLight(id, key, name, isOn, mode, brightness, colorTemperature)
}

async function updateLight(id, key, name, isOn, mode, brightness, colorTemperature) {
    return LightsService.updateLight(id, key, name, isOn, mode, brightness, colorTemperature)
}

async function findLightByName(name) {
    return LightsService.findLightByName(name);
}

module.exports = {
    getLights,
    addLight,
    updateLight,
    findLightByName,
};