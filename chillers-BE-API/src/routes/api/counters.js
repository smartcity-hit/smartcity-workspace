require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const logger = require('../../utils/logger');
const { Devices } = require('../../models/counters');


const getAllCounters = async (req, res) => {
    try {
        const countersDevices = await Devices.find( { deviceType: "2" } );
        res.status(200).json(countersDevices);
    } catch (err) {
        res.status(err.code).json({ code: err.code, message: err.message });
    }
};

router.get('/get', auth, getAllCounters);

module.exports = router;
