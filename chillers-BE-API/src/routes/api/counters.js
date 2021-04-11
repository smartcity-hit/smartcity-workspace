require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const logger = require('../../utils/logger');
const { getAllCounters, 
        getCounterSamplesById, 
        getCounterBasicDetailsById } = require('../../utils/countersService');

const getCounters = async (req, res) => {
  try {
    if (req.user.userType !== '1') {
        throw new Error('User is not an Admin.');
    }

    const counters = await getAllCounters();
    res.status(200).json({ counters });

    } catch (err) {
        logger.error(`Error getAllCounters: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const getCounterSamples = async (req, res) => {
    try {
        if (req.user.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const counterSamples = await getCounterSamplesById(req.params.counterName); // req.params.counterName --> req.params.counterId
        res.status(200).json({ counterSamples });

    } catch (err) {
        logger.error(`Error getCounterSamples: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

const getCounterBasicDetails = async (req, res) => {
    try {
        if (req.user.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const basicDetails = await getCounterBasicDetailsById(req.params.counterName); // req.params.counterName --> req.params.counterId
        res.status(200).json(basicDetails);

    } catch (err) {
        logger.error(`Error getCounterBasicDetails: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

router.get('/get/basicDetails/:counterName', auth, getCounterBasicDetails)
router.get('/get/samples/:counterName', auth, getCounterSamples);
router.get('/get/devices', auth, getCounters);

module.exports = router;
