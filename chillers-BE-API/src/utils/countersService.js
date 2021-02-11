const mongoose = require('mongoose');
const { devicesSchema, countersSchema } = require('./schemas');


/**
 * * All the exported functions, All  of the methods & statics related to schemas
 */

const getCountersSettings= async () => {
  /**
   * * This function will get all counters settings from db and return them in array
   */
    const ChillersDeviceSettings = mongoose.model('Devices', devicesSchema, 'devices');
    const collections = await ChillersDeviceSettings.find( { deviceType: "2" } );
  const names = [];
  
    return collections;
}

// const getCountersNames = async () => {
//   /**
//    * * This function will get all chiller's names from db and return them in array
//    */
//     const CountersNames = mongoose.model('Devices', devicesSchema, 'devices');
//     const collections = await CountersNames.find( { deviceType: "2" } );
//     const names = [];
  
//     collections.forEach(function (collection) {
//       const name = collection.name;
//       const number = name.match(/\d+/g); // check if string containg numbers
//       if (number) { // if name contain numbers then push name to the names array
//         names.push(name);
//       }
//     });
//     return names;
//   }
  
// const loadMongooseModels = async () => {
//   /**
//    * * This function runs when connecting to db successfuly
//    */
//   const countersNames = await getCountersNames();
//   countersNames.forEach((index) => {
//     const id = index + 1;
//     createCountersModel();
//   });
// }

// const createCountersModelAndCollection = async (name) => {
//   /**
//    * * This function will create a new Chillers Model & Collection in db
//    */
//     const Counters = await createCountersModel(name);
//     const counters = new Counters({
//       i1: 0,
//       i2: 0,
//       i3: 0,
//       n_v1: 0,
//       n_v2: 0,
//       n_v3: 0,
//       v1_v2: 0,
//       v1_v3: 0,
//       v2_v3: 0,
//       cos: 0,
//       counterName: `${name}`
//     });
//     await counters.save();
//   }
  
//   const createCountersModel = async () => {
//   /**
//    * * This function will create mongoose model
//    */
//     const Counters = mongoose.model("counters", countersSchema, 'counters');
//     return Counters;
//   }
  

module.exports = {
  getCountersSettings,
  // getCountersNames,
  // createCountersModel,
  // createCountersModelAndCollection,
  // loadMongooseModels
};