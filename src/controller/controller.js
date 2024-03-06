const express = require('express');
const router = express.Router();
const routesService = require('../services/routesService');
const constants = require('../config/constants');

router.get(constants.Routes.LIGHTS, async (req, res) => {
    try {
        const data = await routesService.getLights();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error getting data' });
    }
});

router.post(constants.Routes.LIGHTS, async (req, res) => {
    try {
        if(!req.body){
            res.status(400).json({ error: 'Body is empty' });
        }
        const data = await routesService.addLight(req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error adding light' });
    }
});

router.put(constants.Routes.LIGHTS, async (req, res) => {
    try {
        if(!req.body){
            res.status(400).json({ error: 'Body is empty' });
        }
        const data = await routesService.updateLight(req.body)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error adding light' });
    }
});

router.get(constants.Routes.LIGHTS_BY_NAME, async (req, res) => {
    try {
        const light = await routesService.findLightByName(req.params.name);

        if (light) {
            res.json(light);
        } else {
            res.status(404).send({message: 'Light not found'});
        }

    } catch (error) {
        if (error.message === 'Light not found' ) {
            res.status(404).send({message: 'Light not found'});
        } else {
            res.status(500).send({message: 'Server error'});
        }
    }
});

router.delete(constants.Routes.LIGHTS_BY_NAME, async (req, res) => {
    try {
        const light = await routesService.deleteLight(req.params.name);

        if (light) {
            res.json(light);
        } else {
            res.status(404).send({message: 'Light not found'});
        }

    } catch (error) {
        if (error.message === 'Light not found' ) {
            res.status(404).send({message: 'Light not found'});
        } else {
            res.status(500).send({message: 'Server error'});
        }
    }
});


module.exports = router;
