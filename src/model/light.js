let { Signal } = require("ema-js/loader")
const TuyAPI = require("tuyapi");
const config = require('../config/config');

class Light {
    constructor(id, key, name, isOn = false, mode = "white", brightness = 800, colorTemperature = 500) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.isOn = new Signal(isOn);
        this.mode = new Signal(mode);
        this.brightness = new Signal(brightness);
        this.colorTemperature = new Signal(colorTemperature);
        this.device = new TuyAPI({
            id: this.id,
            key: this.key,
            version: config.getVersion(),
            ip: config.getIpAddress(),
        });
    }

    get id() {
        return this.id;
    }

    get key() {
        return this.key;
    }

    get name() {
        return this.name;
    }

    get isOn() {
        return this.isOn.value;
    }

    get mode() {
        return this.mode.value;
    }

    get brightness() {
        return this.brightness.value;
    }

    get colorTemperature() {
        return this.colorTemperature.value;
    }


    set id(value) {
        this.id = value;
        this.replaceDevice();
    }

    set key(value) {
        this.key = value;
        this.replaceDevice();
    }

    set name(value) {
        this.name = value;
    }

    set isOn(value) {
        this.isOn.value = value;
    }

    set mode(value) {
        this.mode.value = value;
    }

    set brightness(value) {
        this.brightness.value = value;
    }

    set colorTemperature(value) {
        this.colorTemperature.value = value;
    }

    replaceDevice() {
        this.device = new TuyAPI({
            id: this.id,
            key: this.key,
            version: config.getVersion(),
            ip: config.getIpAddress(),
        });
    }

    // Private method to update the device
    async updateDevice() {
        try {
            await this.device.find();
            this.device.connect();

            this.device.on('connected', () => {
                console.log('Connected to device ' + this.name);

                this.device.set({
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
                    this.device.disconnect()
                });
            });

            this.device.on('disconnected', () => {
                return 'Disconnected from device ' + this.name;
            });

            this.device.on('error', error => {
                return {message: 'Error!', error: error};
            });

            setTimeout(() => {
                this.device.disconnect();
            }, 10000);
        } catch (error) {
            console.error('Error updating device:', error)
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
