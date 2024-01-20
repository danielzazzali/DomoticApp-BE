const express = require('express');
const router = express.Router();
const routesService = require('../services/routesService');


router.get('/lights', async (req, res) => {
    try {
        const data = await routesService.getLights();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error getting data' });
    }
});

router.post('/lights', async (req, res) => {
    try {
        if(!req.body){
            res.status(400).json({ error: 'Body is empty' });
        }
        const data = await routesService.addLight(req.body.id, req.body.key, req.body.name, req.body.isOn, req.body.mode, req.body.brightness, req.body.colorTemperature);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error adding light' });
    }
});

router.put('/lights', async (req, res) => {
    try {
        if(!req.body){
            res.status(400).json({ error: 'Body is empty' });
        }
        const data = await routesService.updateLight(req.body.id, req.body.key, req.body.name, req.body.isOn, req.body.mode, req.body.brightness, req.body.colorTemperature)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error adding light' });
    }
});

router.get('/lights/:name', async (req, res) => {
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


module.exports = router;
