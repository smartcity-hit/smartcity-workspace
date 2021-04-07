require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const { getChillersNames, dropCollection, createChillerModelAndCollection, getChillersSettings } = require('../../utils/chillersService');
const { Devices , Chillers} = require('../../models/chillers');
const logger = require('../../utils/logger');

const getAllChillers = async (req, res) => {
    /**
   * * Route: GET '/api/1/chillers/get'
   * * Response: chillers: Array
   * * Description: get the latest data from all chillers
   */
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const chillers = [];
        const chillersNames = await getChillersNames();
        const ChillersData = mongoose.models['Chillers']; // get the model of all chillers
        if (!ChillersData) {
            throw new Error('Couldn\'t find chiller by Id - chillers model dosent exist!')
        }
        for (let index = 0; index < chillersNames.length; index++) {
            // foreach chillerName -> get latest data -> push to chillers array
            const chillerName = chillersNames[index];
            let chillerInfo = await ChillersData.find( { chillerName: `${chillerName}` }).limit(1).sort({ _id: -1 });
            chillerInfo = chillerInfo[0].convertData();
            chillers.push(chillerInfo);
        }
       
        logger.info('getAllChillers:', chillers);
        res.status(200).json(chillers);
    }
    catch (err) {
        logger.error(`getAllChillers failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

const getAllChillersSettings= async (req, res) => {
    /**
   * * Route: GET '/api/1/chillers/get/settings'
   * * Response: chillers: Array
   * * Description: get the settings from all chillers
   */
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const chillers = await getChillersSettings();
        logger.info('getAllChillers:', chillers);
        res.status(200).json({ chillers });
    }
    catch (err) {
        logger.error(`getAllChillers failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

const getChillerById = async (req, res) => {
    /**
   * * Route: GET '/api/1/chillers/get/:id'
   * * Response: chiller: data-Object
   * * Description: get the latest data from chiller by id
   */
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const id = parseInt(req.params.id);
        const Chillers = mongoose.models['chillers']; // get chillers model
        if (!Chillers) {
            throw new Error('Couldn\'t find chiller by Id - chillers model dosent exist!')
        }
        let chillerData = await Chillers.find( { chillerName: `chiller${id}` } ).limit(1).sort({ _id: -1 });// get the latest document from the model collection
        if (!chillerData) {
            throw new Error('Couldn\'t find chiller by Id - there is no data for this chiller!')
        }
        chillerData = chillerData[0].convertData();
        logger.info('getByChillerId:', chillerData);
        res.status(200).json(chillerData);
    } catch (err) {
        logger.error(`getByChillerId failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};


const deleteChiller = async (req, res) => {
    /**
   * * Route: DELETE '/api/1/chillers/delete/:name'
   * * Response: chiller: name-Object
   * * Description: remove chiller document from chillers-names collection and drop collection from db
   * * 
   */
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const { name } = req.params;
        const chiller = await Devices.findOne({ name });
        if (!chiller) {
            throw new Error('Couldn\'t delete chiller - chiller was not found!')
        }
        await chiller.remove();
        await dropCollection(name);
        logger.info('deleteChiller:', chiller);
        res.status(200).json({ chiller });
    } catch(err) {
        logger.error(`deleteChiller failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

const getHistoryById = async (req, res) => {
    /**
   * * Route: GET '/history/:id/:startDate/:endDate'
   * * Response: chiller: Array
   * * Description: getting chiller's history between given dates
   * * 
   */
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const id = parseInt(req.params.id);
        const startDate = new Date(req.params.startDate);
        const endDate = new Date(req.params.endDate).setHours(23, 59, 59, 999); // Setting to end of day
        const Chillers = mongoose.models['Chillers'];// getting chillers model
        if (!Chillers) {
            throw new Error('Couldn\'t find chiller by Id - chillers Model was not found!')
        }
        if (startDate > endDate) { // In case dates are not ordered asc
            throw new Error('Start date cannot be bigger than end date.');
        }
        // get all the documents from the model collection
        let allDocs = await Chillers.find({ "chillerName": `chiller${id}`,
            "createdAt": { "$gte": startDate, "$lt": endDate }
        });
        // Looping though all documents
        for (let i = 0; i < allDocs.length; i++) {
            allDocs[i].convertData();
        }
        res.status(200).json(allDocs);
    } catch (err) {
        logger.error(`getHistoryById failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

const getChillerDateRange = async (req, res) => {
    /**
   * * Route: GET '/daterange/:id/'
   * * Response: Date
   * * Description: getting chiller's dates range based on its id
   * * 
   */
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const id = parseInt(req.params.id);
        const Chillers = mongoose.models['chillers'];// getting chillers model 
        if (!Chillers) {
            throw new Error('Couldn\'t find chiller by Id - chillers model dosent exist!')
        }
        const oldestRecord = await Chillers.find( { chillerName: `chiller${id}` } ).limit(1).sort({ _id: 1 });
        const chillersCreatedDate = oldestRecord[0].get("createdAt");
        const data = {}
        data[`Chiller${id}`] = { initial_date: chillersCreatedDate};
        logger.info('getChillerDateRange:', data);
        res.status(200).json({ initial_date: chillersCreatedDate});
    } catch (err) {
        logger.error(`getChillerDateRange failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}


router.get('/get/settings', auth, getAllChillersSettings);
router.get('/get', auth, getAllChillers);
router.delete('/delete/:name', deleteChiller);
router.get('/get/:id', auth, getChillerById)
router.get('/history/:id/:startDate/:endDate', auth, getHistoryById);
router.get('/daterange/:id', auth, getChillerDateRange);

module.exports = router;