const mongoose = require('mongoose');
const { devicesSchema, countersSamplesSchema } = require('./schemas');

const getAllChillers = async () => {
    const ChillersDevices = mongoose.model('Devices', devicesSchema, 'devices');
    const chillers = await ChillersDevices.find( { deviceType: '1' } );
  
    return chillers;
}

const getChillerSamplesById = async (id) => {
    const Chillers = mongoose.model('Chillers', countersSamplesSchema, 'chillers');
    const chillerSamples = await Chillers.find( { chillerId: id } );
  
    return chillerSamples;
}

const getChillerBasicDetailsById = async (id) => {
  const ChillersDevices = mongoose.model('Devices', devicesSchema, 'devices');
  const basicDetails = await ChillersDevices.find( { deviceType: '1' , deviceId: id } );

  return basicDetails[0];
}

module.exports = {
    getAllChillers,
    getChillerSamplesById,
    getChillerBasicDetailsById
};