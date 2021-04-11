require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const logger = require('../../utils/logger');
const { Devices, Counters } = require('../../models/counters');
const { getCountersSettings, getCounterSamplesByName, getCounterBasicDetailsByName, getCountersNames, createCountersModelAndCollection } = require('../../utils/countersService');


const getCounterDevicesById = async (req, res) => {
   /**
   * * Route: GET '/api/1/counters/get/settings'
   * * Response: chillers: Array
   * * Description: get the settings from all counters
   */
  try {
    const loggedInUser = req.user;
    if (loggedInUser.userType !== '1') {
        throw new Error('User is not an Admin.');
    }
    const counters = await getCountersSettings();
    logger.info('getAllCounters:', counters);
    res.status(200).json({ counters });
    } catch (err) {
        logger.error(`getAllCountersSettings failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const getCounterById = async (req, res) => {
       /**
   * * Route: GET /data/:id/:startDate/:endDate'
   * * Response: counter: Array
   * * Description: getting counter's data between given dates
   * * 
   */
  try {
    const loggedInUser = req.user;
    if (loggedInUser.userType !== '1') {
        throw new Error('User is not an Admin.');
      }
    const id = parseInt(req.params.id);
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate).setHours(23,59,59,999); // Setting to end of day
    const CountersData = mongoose.models['Counters'];// getting counters model
        if (!CountersData) {
        throw new Error('Couldn\'t find counter by Id - counters Model was not found!')
    }
    if (startDate > endDate) { // In case dates are not ordered asc
        throw new Error('Start date cannot be bigger than end date.');
    }
    // get all the documents from the model collection
    let allDocs = await CountersData.find({ "counterName": `counter${id}`,
        "createdAt": { "$gte": startDate, "$lt": endDate }
    });
    res.status(200).json(allDocs);
} catch (err) {
    logger.error(`getCounterById failed: ${err.message}`);
    res.status(400).json({ code: err.code, message: err.message });
    }
    
};

const getCounterDateRange = async (req, res) => {
    /**
   * * Route: GET '/daterange/:id/'
   * * Response: Date
   * * Description: getting counter's dates range based on its id
   * * 
   */
  try {
    const loggedInUser = req.user;
    if (loggedInUser.userType !== '1') {
        throw new Error('User is not an Admin.');
    }
    const id = parseInt(req.params.id);
    const oldestRecord = await Counters.find( { counterName: `counter${id}` } ).limit(1).sort({ _id: 1 });
    const counterCreatedDate = oldestRecord[0].get("createdAt");
    const data = {}
    data[`counter${id}`] = { initial_date: counterCreatedDate};
    logger.info('getCounterDateRange:', data);
    res.status(200).json({ initial_date: counterCreatedDate});
} catch (err) {
    logger.error(`getCounterDateRange failed: ${err.message}`);
    res.status(400).json({ code: err.code, message: err.message });
}
};

const getCounterSamples = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const counterSamples = await getCounterSamplesByName(req.params.counterName);
        logger.info('getCounterSamples:', counterSamples);
        res.status(200).json({ counterSamples });

    } catch (err) {
        logger.error(`getCounterSamples failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

const getCounterBasicDetails = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const counter = await getCounterBasicDetailsByName(req.params.counterName);
        logger.info('getCounterBasicDetails:', counter);
        res.status(200).json(counter);

    } catch (err) {
        logger.error(`getCounterBasicDetails failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

const createCounter = async (req, res) => {
    try {
            const loggedInUser = req.user;
            if (loggedInUser.userType !== '1') {
                throw new Error('User is not an Admin.');
            }
            const countersNames = await getCountersNames();
            if (countersNames.length === 0) { // no counters in db
                id = 1;
            }
            else {
                id = Number(countersNames[countersNames.length - 1].split('r')[1]) + 1;
            }
            const name = `counter${id}`;
            const { host, port, unitId, deviceType } = req.body;
            const counterDeviceSettings = new Devices({ name, host, port, unitId, deviceType });
            await counterDeviceSettings.save();
            await createCountersModelAndCollection(id, name);
            logger.info('createCounter:', counterDeviceSettings);
            res.status(200).json({ counterrDeviceSettings: counterDeviceSettings });
    }
    catch (err) {
        logger.error(`createDevice counter is failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
  }


router.get('/get/basicDetails/:counterName', auth, getCounterBasicDetails)
router.get('/get/samples/:counterName', auth, getCounterSamples);
router.get('/data/:id/:startDate/:endDate', auth, getCounterById);
router.get('/get/devices', auth, getCounterDevicesById);
router.get('/daterange/:id', auth, getCounterDateRange);
router.post('/create', auth, createCounter);

module.exports = router;
