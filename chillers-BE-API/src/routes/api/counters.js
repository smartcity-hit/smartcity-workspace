require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const logger = require('../../utils/logger');
const { Devices, Counters } = require('../../models/counters');
const { getCountersSettings } = require('../../utils/countersService');


const getAllCountersSettings = async (req, res) => {
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
}
catch (err) {
    logger.error(`getAllCountersSettings failed: ${err.message}`);
    res.status(400).json({ code: err.code, message: err.message });
}

};

const getCounterHistoryById = async (req, res) => {
       /**
   * * Route: GET /history/:id/:startDate/:endDate'
   * * Response: counter: Array
   * * Description: getting counter's history between given dates
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
    // Looping though all documents
    // for (let i = 0; i < allDocs.length; i++) {
    //     allDocs[i].convertData();
    // }
    res.status(200).json(allDocs);
} catch (err) {
    logger.error(`getCounterHistoryById failed: ${err.message}`);
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
   // const Counters = mongoose.models['counters'];// getting counters model 
   // if (!Counters) {
   //     throw new Error('Couldn\'t find counter by Id - counters model dosent exist!')
   // }
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

router.get('/history/:id/:startDate/:endDate', auth, getCounterHistoryById);
router.get('/get/settings', auth, getAllCountersSettings);
router.get('/daterange/:id', auth, getCounterDateRange);

module.exports = router;
