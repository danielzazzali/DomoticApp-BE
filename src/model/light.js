let { Signal } = require("ema-js/loader")
const TuyAPI = require("tuyapi");
const config = require('../config/config');

class Light {
    #id;
    #key;
    #name;
    #isOn;
    #mode;
    #brightness;
    #colorTemperature;
    #device;

    constructor(id, key, name, isOn = false, mode = "white", brightness = 800, colorTemperature = 500) {
        this.#id = id;
        this.#key = key;
        this.#name = name;
        this.#isOn = new Signal(isOn);
        this.#mode = new Signal(mode);
        this.#brightness = new Signal(brightness);
        this.#colorTemperature = new Signal(colorTemperature);
        this.#device = new TuyAPI({
            id: this.#id,
            key: this.#key,
            version: config.getVersion(),
            ip: config.getIpAddress(),
        });
    }

    //TODO: setters y getters para los atributos de device


    // Getters
    get name() {
        return this.#name;
    }

    get isOn() {
        return this.#isOn.value;
    }

    get mode() {
        return this.#mode.value;
    }

    get brightness() {
        return this.#brightness.value;
    }

    get colorTemperature() {
        return this.#colorTemperature.value;
    }

    // Setters

    set name(value) {
        //TODO: update db
        this.#name = value;
    }

    set isOn(value) {
        //TODO: update db
        this.#isOn.value = value;
        this.#updateDevice().then(r => console.log(r)).catch(e => console.log(e));
    }

    set mode(value) {
        //TODO: update db
        this.#mode.value = value;
        this.#updateDevice().then(r => console.log(r)).catch(e => console.log(e));
    }

    set brightness(value) {
        //TODO: update db
        this.#brightness.value = value;
        this.#updateDevice().then(r => console.log(r)).catch(e => console.log(e));
    }

    set colorTemperature(value) {
        //TODO: update db
        this.#colorTemperature.value = value;
        this.#updateDevice().then(r => console.log(r)).catch(e => console.log(e));
    }

    // Private method to update the device
    async #updateDevice() {
        try {
            await this.#device.find();
            this.#device.connect();

            this.#device.on('connected', () => {
                console.log('Connected to device ' + this.#name);

                this.#device.set({
                    multiple: true,
                    data: {
                        /**
                         * For reference: https://developer.tuya.com/en/docs/iot/product-function-definition?id=K9s9rhj576ypf
                         */
                        '20': this.isOn,
                        '21': this.mode,
                        '22': this.brightness,
                        '23': this.colorTemperature
                    }
                }).then(() => {
                    //TODO: update device info on db
                    this.#device.disconnect()
                });
            });

            this.#device.on('disconnected', () => {
                return 'Disconnected from device ' + this.#name;
            });

            this.#device.on('error', error => {
                return {message: 'Error!', error: error};
            });

            setTimeout(() => {
                this.#device.disconnect();
            }, 10000);
        } catch (error) {
            return {message: 'Error updating device:', error: error};
        }
    }

    static formatLightResponse(light) {
        return {
            name: light.name,
            isOn: light.isOn,
            mode: light.mode,
            brightness: light.brightness,
            colorTemperature: light.colorTemperature
        }
    }
}

module.exports = { Light };
