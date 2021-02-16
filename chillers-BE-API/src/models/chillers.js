const mongoose = require('mongoose');
const { devicesSchema, chillersSchema } = require('../utils/schemas')

/**
 * * all is imported from Chiller Service
 */


const Devices = mongoose.model('Devices', devicesSchema, 'devices');
const collections = Devices.find({ deviceType: "1" });

const Chillers = mongoose.model('Chillers', chillersSchema, 'chillers');


module.exports = { Devices , Chillers};
