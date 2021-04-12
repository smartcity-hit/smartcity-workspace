require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const logger = require('../../utils/logger');
const { getAllChillers, 
        getChillerSamplesById, 
        getChillerBasicDetailsById } = require('../../utils/chillersService-temp');


getChillers = async (req, res) => {
    try {
      if (req.user.userType !== '1') {
          throw new Error('User is not an Admin.');
      }
  
      const chillers = await getAllChillers();
      res.status(200).json({ chillers });
  
    } catch (err) {
        logger.error(`Error getChillers: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const getChillerSamples = async (req, res) => {
    try {
        if (req.user.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const chillerSamples = await getChillerSamplesById(req.params.chillerName); // req.params.chillerName --> req.params.chillerId
        res.status(200).json({ chillerSamples });

    } catch (err) {
        logger.error(`Error getChillerSamples: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

const getChillerBasicDetails = async (req, res) => {
    try {
        if (req.user.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const basicDetails = await getChillerBasicDetailsById(req.params.chillerName); // req.params.chillerName --> req.params.chillerId
        res.status(200).json(basicDetails);

    } catch (err) {
        logger.error(`Error getChillerBasicDetails: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

router.get('/', auth, getChillers);
router.get('/:chillerName/basicDetails', auth, getChillerBasicDetails)
router.get('/:chillerName/samples', auth, getChillerSamples);

module.exports = router;