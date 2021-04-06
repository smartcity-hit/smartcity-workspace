require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const logger = require('../../utils/logger');
const { Devices, Counters } = require('../../models/counters');
const { getCountersNames, createCountersModelAndCollection, createCounter } = require('../../utils/countersService');
const { getChillersNames, dropCollection, createChillerModelAndCollection, getChillersSettings, createChiller } = require('../../utils/chillersService');
const { Chillers } = require('../../models/chillers');



const createDevice = async (req, res) => {
    /**
   * * Route: POST '/api/1/devices/create'
   * * Response: device name-Object
   * * Description: add new chiller or counter document to the devices collection and create collection from db
   */
    
        let id;
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        let deviceType = req.body.deviceType;
        if (!deviceType)
         logger.error('deviceType is missing');
    
        if (deviceType == 2) {
            createCounter(req, res);

        }
        else {
            if (deviceType == 1)
                createChiller(req, res);
        }
                  
}

router.post('/createdevice', auth, createDevice);


module.exports = router;
