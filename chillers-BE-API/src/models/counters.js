const mongoose = require('mongoose');
const { devicesSchema } = require('../utils/schemas')

/**
 * * all is imported from Counters
 */


const Devices = mongoose.model('Devices', devicesSchema, 'devices');
const collections = Devices.find( { deviceType: "2" } );

module.exports = { Devices };
