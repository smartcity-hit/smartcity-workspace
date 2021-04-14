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

        var id = req.params.chillerId;
        if(typeof id === 'string'){
            id = parseInt(id);
        }
        
        const chillerSamples = await getChillerSamplesById(id);
        if(chillerSamples !== undefined) {
            res.status(200).json({ chillerSamples });
        }

        else {
            throw new Error('no samples found.')
        }
        

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

        var id = req.params.chillerId;
        if(typeof id === 'string'){
            id = parseInt(id);
        }

        const basicDetails = await getChillerBasicDetailsById(id);
        if(basicDetails !== undefined) {
            res.status(200).json(basicDetails);
        }

        else {
            throw new Error('chiller not found.');
        }
    } catch (err) {
        logger.error(`Error getChillerBasicDetails: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

router.get('/', auth, getChillers);
router.get('/:chillerId/basicDetails', auth, getChillerBasicDetails)
router.get('/:chillerId/samples', auth, getChillerSamples);

module.exports = router;