const mongoose = require('mongoose');
const fahrenheitToCelcius = require('./data');
const { chillersNamesSchema, devicesSchema, chillersSchema } = require('../utils/schemas');
const logger = require('../utils/logger');
const { Devices } = require('../models/counters');


/**
 * * All  of the methods & statics related to schemas
 */


chillersSchema.methods.convertData = function() {
  const chiller = this;
  console.log(chiller['dateTime']);
  // if (!chiller.enteringWaterTemp && !chiller.leavingWaterTemp && !chiller.enteringGasTemp, !chiller.leavingGasTemp) {
    // return chiller;
  // }
  // Converting temperatures from F to C
  chiller.set({ enteringWaterTemp: fahrenheitToCelcius(chiller.enteringWaterTemp) });
  chiller.set({ leavingWaterTemp: fahrenheitToCelcius(chiller.leavingWaterTemp) });
  chiller.set({ enteringGasTemp: fahrenheitToCelcius(chiller.enteringGasTemp) });
  chiller.set({ leavingGasTemp: fahrenheitToCelcius(chiller.leavingGasTemp) });
  console.log(chiller);
  return chiller;
};

/**
 * * All the exported functions
 */

const changeCollectionName = async (collectionName, newName) => {
  try { 
    let db = mongoose.connection.db;
      return await db.collection(collectionName).rename(newName)
      .then(() => {
      console.log('Collection rename successful!');
      });
  
  } catch (err) {
      
  }
}

const dropCollection = async (collectionName) => {
/**
 ** This function will remove a collection from the db by the collection name
 */
  let db = mongoose.connection.db;
  db.dropCollection(collectionName, (err, result) => {
    if (err) {
      console.log('error delete collection');
    } else {
      console.log(`delete collection "${collectionName}" successfuly`);
    }
  });
  const modelName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1); // uppercase first letter
  delete mongoose.models[modelName]; // remove the model from the current mongoose instance
  delete mongoose.connections[0].collections[collectionName]; // remove the collection from the current mongoose instance
}

const getChillersNames = async () => {
/**
 * * This function will get all chiller's names from db and return them in array
 */
  const ChillersNames = mongoose.model('Devices', devicesSchema, 'devices');
  const collections = await ChillersNames.find( { deviceType: "1" } );
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

const getChillersSettings= async () => {
  /**
   * * This function will get all chiller's settings from db and return them in array
   */
    const ChillersDeviceSettings = mongoose.model('Devices', devicesSchema, 'devices');
    const collections = await ChillersDeviceSettings.find( { deviceType: "1" } );
  
    return collections;
}
  
const loadMongooseModels = async () => {
  /**
   * * This function runs when connecting to db successfuly
   */
  const chillersNames = await getChillersNames();
  chillersNames.forEach((index) => {
    const id = index + 1;
    createChillersModel();
  });
}

const createChillersModelAndCollection = async (name) => {
/**
 * * This function will create a new Chillers Model & Collection in db
 */
  const Chillers = await createChillersModel(name);
  const chillers = new Chillers({
    enteringWaterTemp: 0,
    leavingWaterTemp: 0,
    enteringGasTemp: 0,
    leavingGasTemp: 0,
    firstCircuitPressure: 0,
    controlPoint: 0,
    demandLimit: 0,
    chillerState: 0,
    chillerName: `${name}`
  });
  await chillers.save();
}

const createChillersModel = async () => {
/**
 * * This function will create mongoose model
 */
  const Chillers = mongoose.model("chillers", chillersSchema, 'chillers');


  return Chillers;
}


const createChiller = async (req, res) => {
  /*
 * * Route: POST '/api/1/chillers/create'
 * * Response: chiller name-Object
 * * Description: add new chiller document to the chillers-names collection and create collection from db
 */
  try {
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
      await createChillersModelAndCollection(id, name);
      logger.info('createChiller:', chillerDeviceSettings);
      res.status(200).json({ chillerDeviceSettings });
  } catch(err) {
      logger.error(`createChiller failed: ${err.message}`);
      res.status(400).json({ code: err.code, message: err.message });
  }
}

module.exports = {
  changeCollectionName,
  getChillersNames,
  getChillersSettings,
  createChillerModel: createChillersModel,
  chillersSchema,
  chillersNamesSchema,
  devicesSchema,
  dropCollection,
  createChillerModelAndCollection: createChillersModelAndCollection,
  loadMongooseModels,
  createChiller
};