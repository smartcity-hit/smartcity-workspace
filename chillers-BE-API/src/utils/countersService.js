const mongoose = require('mongoose');
const { devicesSchema, countersSamplesSchema } = require('./schemas');


/**
 * * All the exported functions, All  of the methods & statics related to schemas
 */

const getCountersSettings = async () => {
    const CountersDevices = mongoose.model('Devices', devicesSchema, 'devices');
    const collections = await CountersDevices.find( { deviceType: '2' } );
  
    return collections;
}

const getCounterSamplesByName = async (counterName) => {
    const Counter = mongoose.model('Counters', countersSamplesSchema, 'counters');
    const counters = await Counter.find( { counterName: counterName } );
  
    return counters;
}

const getCounterBasicDetailsByName = async (counterName) => {
  const CountersDevices = mongoose.model('Devices', devicesSchema, 'devices');
  const counters = await CountersDevices.find( { deviceType: '2' , name: counterName } );

  return counters[0];
}

module.exports = {
  getCountersSettings,
  getCounterSamplesByName,
  getCounterBasicDetailsByName
};