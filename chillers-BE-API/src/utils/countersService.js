const mongoose = require('mongoose');
const { devicesSchema, countersSamplesSchema } = require('./schemas');

const getAllCounters = async () => {
    const CountersDevices = mongoose.model('Devices', devicesSchema, 'devices');
    const counters = await CountersDevices.find( { deviceType: '2' } );
  
    return counters;
}

const getCounterSamplesById = async (id) => {
    const Counters = mongoose.model('Counters', countersSamplesSchema, 'counters');
    const counterSamples = await Counters.find( { counterId: id } );
  
    return counterSamples;
}

const getCounterBasicDetailsById = async (id) => {
  const CountersDevices = mongoose.model('Devices', devicesSchema, 'devices');
  const basicDetails = await CountersDevices.find( { deviceType: '2' , deviceId: id } );

  return basicDetails[0];
}

module.exports = {
  getAllCounters,
  getCounterSamplesById,
  getCounterBasicDetailsById
};