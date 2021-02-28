const mongoose = require('mongoose');
const { devicesSchema, countersSchema } = require('./schemas');


/**
 * * All the exported functions, All  of the methods & statics related to schemas
 */

const getCountersSettings = async () => {
    const CountersDevices = mongoose.model('Devices', devicesSchema, 'devices');
    const collections = await CountersDevices.find( { deviceType: '2' } );
  
    return collections;
}

const getCounterSamples = async (counterName) => {
    const CounterSamples = mongoose.model('Counters', countersSchema, 'counters');
    const collections = await CounterSamples.find( { counterName: counterName } );
  
    return collections;
}

module.exports = {
  getCountersSettings,
  getCounterSamples
};