const mongoose = require('mongoose');
const { chillersSchema, chillersNamesSchema, devicesSchema } = require('../utils/chillersService')

/**
 * * all is imported from Chiller Service
 */


const Devices = mongoose.model('Devices', devicesSchema, 'devices');
const collections = Devices.find( { deviceType: "1" } );

module.exports = { Devices };
