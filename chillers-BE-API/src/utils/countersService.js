const mongoose = require('mongoose');
const { devicesSchema, countersSamplesSchema } = require('./schemas');

const getAllCounters = async () => {
    const CountersDevices = mongoose.model('Devices', devicesSchema, 'devices');
    const counters = await CountersDevices.find( { deviceType: '2' } );
  
    return counters;
}

const getCounterSamplesById = async (id) => {
    const Counter = mongoose.model('Counters', countersSamplesSchema, 'counters');
    const counterSamples = await Counter.find( { counterName: id } ); // counterName --> counterId
  
    return counterSamples;
}

const getCounterBasicDetailsById = async (id) => {
  const CountersDevices = mongoose.model('Devices', devicesSchema, 'devices');
  const basicDetails = await CountersDevices.find( { deviceType: '2' , name: id } );// name --> deviceId

  return basicDetails[0];
}

module.exports = {
  getAllCounters,
  getCounterSamplesById,
  getCounterBasicDetailsById
};