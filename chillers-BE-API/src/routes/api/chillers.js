require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const { getChillersNames, dropCollection, createChillerModelAndCollection, getChillersSettings } = require('../../utils/chillersService');
const { Devices } = require('../../models/chillers');
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
        const Chillers = mongoose.models['chillers']; // get the model of all chillers
        for (let index = 0; index < chillersNames.length; index++) {
            // foreach chillerName -> get latest data -> push to chillers array
            const chillerName = chillersNames[index];
            let chillerInfo = await Chillers.find( { chillerName: `${chillerName}` }).limit(1).sort({ _id: -1 });
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

const createChiller = async (req, res) => {
    /**
   * * Route: POST '/api/1/chillers/create'
   * * Response: chiller name-Object
   * * Description: add new chiller document to the chillers-names collection and create collection from db
   */
    try {
        // const loggedInUser = req.user;
        // if (loggedInUser.userType !== '1') {
        //     throw new Error('User is not an Admin.');
        // }
        const chillersNames = await getChillersNames();
        let id;
        if (chillersNames.length === 0) { // no chillers in db
            id = 1;
        } else {
            id = Number(chillersNames[chillersNames.length - 1].split('r')[1]) + 1;
        }
        const name = `chiller${id}`;
        const { host, port, unitId, deviceType } = req.body;
        const chillerDeviceSettings = new Devices({ name, host, port, unitId, deviceType });
        await chillerDeviceSettings.save();
        await createChillerModelAndCollection(id, name);
        logger.info('createChiller:', chillerDeviceSettings);
        res.status(200).json({ chillerDeviceSettings });
    } catch(err) {
        logger.error(`createChiller failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}

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
        const endDate = new Date(req.params.endDate).setHours(23,59,59,999); // Setting to end of day
        const Chillers = mongoose.models[`chillers`];// getting chillers model
        if (!Chillers) {
            throw new Error('Couldn\'t find chiller by Id - chiller Model was not found!')
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

const editChiller = async (req, res) => {
    /**
   * * Route: PATCH '/edit/:id/'
   * * Response: Chiller(object)
   * * Description: editing an exist chiller
   * * 
   */
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const id = parseInt(req.params.id);
        const specificChiller = await Devices.find({name: `chiller${id}`}).limit(1);
        if (!specificChiller) {
            throw new Error('Couldn\'t find chiller - chiller Model was not found!')
        }
        const updates = Object.keys(req.body);
        const allowedUpdates = ["host", "port", "unitId"];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isValidOperation) {
            throw Error('Error: You can\'t change chiller name');
        }
        updates.forEach(update => (specificChiller[0][update] = req.body[update]));
        await specificChiller[0].save();
        logger.info('editChiller:', specificChiller[0]);
        res.status(200).json(specificChiller[0]);
    } catch (err) {
        logger.error(`editChiller failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
}



router.get('/get/settings', auth, getAllChillersSettings);
router.get('/get', auth, getAllChillers);
router.post('/create', createChiller);
router.delete('/delete/:name', deleteChiller);
router.get('/get/:id', auth, getChillerById)
router.get('/history/:id/:startDate/:endDate', auth, getHistoryById);
router.get('/daterange/:id', auth, getChillerDateRange);
router.patch('/edit/:id', auth, editChiller);

module.exports = router;