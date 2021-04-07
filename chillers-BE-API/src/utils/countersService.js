const mongoose = require('mongoose');
const { devicesSchema, countersSchema } = require('./schemas');
const logger = require('../utils/logger');
const { Devices } = require('../models/counters');


/**
 * * All the exported functions, All  of the methods & statics related to schemas
 */

const getCountersSettings = async () => {
    const CountersDevices = mongoose.model('Devices', devicesSchema, 'devices');
    const collections = await CountersDevices.find( { deviceType: '2' } );
  
    return collections;
}

const getCounterSamplesByName = async (counterName) => {
    const Counter = mongoose.model('Counters', countersSchema, 'counters');
    const counters = await Counter.find( { counterName: counterName } );
  
    return counters;
}

const getCounterBasicDetailsByName = async (counterName) => {
  const CountersDevices = mongoose.model('Devices', devicesSchema, 'devices');
  const counters = await CountersDevices.find( { deviceType: '2' , name: counterName } );

  return counters[0];
}
const getCountersNames = async () => {
  /**
   * * This function will get all counter's names from db and return them in array
   */
    const CountersNames = mongoose.model('Devices', devicesSchema, 'devices');
    const collections = await CountersNames.find( { deviceType: "2" } );
    const names = [];
  
    collections.forEach(function (collection) {
      const name = collection.name;
      const number = name.match(/\d+/g); // check if string containg numbers
      if (number) { // if name contain numbers then push name to the names array
        names.push(name);
      }
    });
    return names;
}
  
const createCountersModelAndCollection = async (name) => {
  /**
   * * This function will create a new counters Model & Collection in db
   */
    const Counters = await createCountersModel(name);
    const counters = new Counters({
      i1: 0,
      i2: 0,
      i3: 0,
      n_v1: 0,
      n_v2: 0,
      n_v3: 0,
      v1_v2: 0,
      v1_v3: 0,
      v2_v3: 0,
      cos: 0,
      counterName: `${name}`
    });
    await counters.save();
}

const createCountersModel = async () => {
  /**
   * * This function will create mongoose model
   */
    const Counters = mongoose.model("counters", countersSchema, 'counters');
  
  
    return Counters;
}

const createCounter = async (req, res) => {
  try {
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

const editCounter = async (req, res) => {
  /**
 * * Route: PATCH '/edit/:id/'
 * * Response: Counter(object)
 * * Description: editing an exist counter
 * * 
 */
  try {
      const id = parseInt(req.params.id);
      const specificCounter = await Devices.find({name: `counter${id}`}).limit(1);
      if (!specificCounter) {
          throw new Error('Couldn\'t find counter - counter Model was not found!')
      }
      const updates = Object.keys(req.body);
      const allowedUpdates = ["host", "port", "unitId"];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));
      if (!isValidOperation) {
          throw Error('Error: You can\'t change counter name or deviceType fields');
      }
      updates.forEach(update => (specificCounter[0][update] = req.body[update]));
      await specificCounter[0].save();
      logger.info('editCounter:', specificCounter[0]);
      res.status(200).json(specificCounter[0]);
  } catch (err) {
      logger.error(`editCounter failed: ${err.message}`);
      res.status(400).json({ code: err.code, message: err.message });
  }
}

module.exports = {
  getCountersSettings,
  getCounterSamplesByName,
  getCounterBasicDetailsByName,
  getCountersNames,
  createCountersModelAndCollection,
  createCounter,
  editCounter
};