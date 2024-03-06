const { Light } = require("../model/light");
const config = require('../config/config');
const TuyAPI = require('tuyapi');
const db = require('../database/database')
const constants = require('../config/constants');
const fs = require('fs').promises;

class LightsService {

    constructor() {
        this._lights = [];
        this.isInitialized = false;
    }

    async init() {
        this._lights = await this.getLightsFromDb();
        this.isInitialized = true;
    }


    async loadSqlQuery(filePath) {
        try {
            return await fs.readFile(filePath, { encoding: 'utf8' });
        } catch (error) {
            console.error(`Error reading SQL file: ${error.message}`);
            throw error;
        }
    }

    async getLightsFromDb() {
        const query = await this.loadSqlQuery(constants.SqlFiles.GET_LIGHTS);
        const result = await db.query(query);
        return result.rows.map(row => new Light(row.id, row.key, row.name, row.is_on, row.mode, row.brightness, row.color_temperature));
    }

    async addLightToBd(id, key, name, isOn, mode, brightness, colorTemperature) {
        const insertQuery = await this.loadSqlQuery(constants.SqlFiles.INSERT_LIGHT);
        const values = [id, key, name, isOn, mode, brightness, colorTemperature];
        const result = await db.query(insertQuery, values);
        const newRow = result.rows[0];
        return new Light(newRow.id, newRow.key, newRow.name, newRow.is_on, newRow.mode, newRow.brightness, newRow.color_temperature);
    }

    async deleteLightOnBd(id) {
        const deleteQuery = await this.loadSqlQuery(constants.SqlFiles.DELETE_LIGHT);
        const result = await db.query(deleteQuery, [id]);
        return result.rows[0];
    }

    async updateLightInDb(id, key, name, isOn, mode, brightness, colorTemperature) {
        const updateQuery = await this.loadSqlQuery(constants.SqlFiles.UPDATE_LIGHT);
        const values = [id, key, name, isOn, mode, brightness, colorTemperature];
        const res = await db.query(updateQuery, values);
        return res.rows[0];
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

    async addLight(id, key, name, isOn, mode, brightness, colorTemperature) {
        const light = await this.addLightToBd(id, key, name, isOn, mode, brightness, colorTemperature);
        this._lights.push(light);
        return Light.formatLightResponse(light);
    }

    async updateLight(name, newName, isOn, mode, brightness, colorTemperature) {

        const light = this._lights.find(light => light.name === name);

        if(!light) {
            throw new Error('Light not found');
        }

        const updatedRow = await this.updateLightInDb(light.id, light.key, newName, isOn, mode, brightness, colorTemperature);

        if (light) {
            light.name = updatedRow.name;
            light.isOn = updatedRow.is_on;
            light.mode = updatedRow.mode;
            light.brightness = updatedRow.brightness;
            light.colorTemperature = updatedRow.color_temperature;

/*            try {
                await light.updateDevice();
            } catch (error) {
                console.error('Error updating device:', error);
            }*/
        }

        return Light.formatLightResponse(light);
    }

    async deleteLight(name) {

        const id = this._lights.find(light => light.name === name).id;

        const result = await this.deleteLightOnBd(id);

        if (!result) {
            throw new Error('Light not found');
        }

        this._lights = this._lights.filter(light => light.id !== id);
    }

}

const lightsService = new LightsService();
lightsService.init().then(() => {
    console.log('LightsService initialized');
}).catch(err => {
    console.error('Error initializing LightsService:', err);
});

module.exports = lightsService;
