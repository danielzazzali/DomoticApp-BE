const { Light } = require("../model/light");
const config = require('../config/config');
const TuyAPI = require("tuyapi");

class LightsService {
    constructor() {

        // TODO: this._lights = #getLightsFromDb();

        this._lights = [
            // Examples
            new Light("abcdefghijklmnop", "abcdefghijklmnop", "Luz Sala"),
            new Light("abcdefghijklmnop", "abcdefghijklmnop", "Luz Cocina"),
            new Light("abcdefghijklmnop", "abcdefghijklmnop", "Luz Dormitorio")
        ];
    }

    getLights() {
        return this._lights.map(light => Light.formatLightResponse(light));
    }

    findLightByName(name) {
        const light = this._lights.find(light => light.name === name);
        if (!light) {
            throw new Error('Light not found');
        }

        return Light.formatLightResponse(light);
    }

    addLight(id, key, name, isOn, mode, brightness, colorTemperature) {
        //TODO: aqui VALIDAR y luego agregar la luz en bd
        const device = new TuyAPI({
            id: id,
            key: key,
            version: config.getVersion(),
            ip: config.getIpAddress()
        });

        const light = new Light(name, isOn, mode, brightness, colorTemperature, device);
        this._lights.push(light);
        return Light.formatLightResponse(light);
    }

    updateLight(id, key, name, isOn, mode, brightness, colorTemperature) {
        const light = this._lights.find(light => light.name === name);
        light.name = name;
        light.isOn = isOn;
        light.mode = mode;
        light.brightness = brightness;
        light.colorTemperature = colorTemperature;
        return Light.formatLightResponse(light);
    }

    #getLightsFromDb() {
        //TODO: load lights from db starting the app
    }

}

const lightsService = new LightsService();
module.exports = lightsService;
