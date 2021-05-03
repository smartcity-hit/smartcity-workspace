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
    res.status(200).json(counters);

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

        var id = req.params.counterId;
        if(typeof id === 'string'){
            id = parseInt(id);
        }
        
        const counterSamples = await getCounterSamplesById(id);
        if(counterSamples !== undefined) {
            res.status(200).json(counterSamples);
        }

        else {
            throw new Error('no samples found.')
        }

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

        var id = req.params.counterId;
        if(typeof id === 'string'){
            id = parseInt(id);
        }

        const basicDetails = await getCounterBasicDetailsById(id);
        if(basicDetails !== undefined) {
            res.status(200).json(basicDetails);
        }

        else {
            throw new Error('counter not found.');
        }
    } catch (err) {
        logger.error(`Error getCounterBasicDetails: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

const deleteCounter = async (req, res) => {
    res.status(200).json({message: 'succes'}); // implement delete function
}

const addCounter = async (req, res) => {
    res.status(200).json({message: 'succes'}); // implement add function
}

router.get('/', auth, getCounters);
router.get('/:counterId/basicDetails', auth, getCounterBasicDetails)
router.get('/:counterId/samples', auth, getCounterSamples);
router.delete('/:counterId', auth, deleteCounter);
router.post('/', auth, addCounter);

module.exports = router;
