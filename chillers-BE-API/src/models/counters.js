const mongoose = require('mongoose');
const { devicesSchema, countersSchema } = require('../utils/schemas')

/**
 * * all is imported from Counters
 */


const Devices = mongoose.model('Devices', devicesSchema, 'devices');
const collections = Devices.find({ deviceType: "2" });


const Counters = mongoose.model('Counters', countersSchema, 'counters');


module.exports = { Devices , Counters};
