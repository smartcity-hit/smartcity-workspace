const mongoose = require('mongoose');
const { devicesSchema, chillersSamplesSchema } = require('../utils/schemas')

/**
 * * all is imported from Chiller Service
 */


const Devices = mongoose.model('Devices', devicesSchema, 'devices');
const collections = Devices.find({ deviceType: "1" });

const Chillers = mongoose.model('Chillers', chillersSamplesSchema, 'chillers');


module.exports = { Devices , Chillers};
