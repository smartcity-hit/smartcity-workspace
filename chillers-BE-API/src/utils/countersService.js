const mongoose = require('mongoose');
const { chillersNamesSchema, devicesSchema, chillersSchema } = require('./schemas');


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

module.exports = {
  getCountersSettings
};