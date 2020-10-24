const mongoose = require('mongoose');
const { chillersSchema, chillersNamesSchema } = require('../utils/chillersService')

/**
 * * all is imported from Chiller Service
 */


const ChillersNames = mongoose.model('ChillersNames', chillersNamesSchema, 'chillers-names');

module.exports = { ChillersNames };
