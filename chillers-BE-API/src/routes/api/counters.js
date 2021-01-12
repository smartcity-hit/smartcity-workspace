require('dotenv').config();
const express = require('express');
const router = express.Router();
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


const getCounterByID = async (req, res) => {
    try {
        const countersDevices = await Devices.find( { deviceType: "2" } );
        res.status(200).json(countersDevices);
    } catch (err) {
        res.status(err.code).json({ code: err.code, message: err.message });
    }
};

router.get('/get/settings', auth, getAllCountersSettings);


module.exports = router;
