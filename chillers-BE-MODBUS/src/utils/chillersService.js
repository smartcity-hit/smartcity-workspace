const mongoose = require('mongoose');
const {devicesSchema, chillersSchema} = require('./schemas');

/**
 * * All the exported functions
 */

 
const getAllChillers = async () => {
  /**
   * * This function will get all chiller's names from db and return them in array
   */
  const Chillers = mongoose.model('Devices', devicesSchema, 'devices');
  const records = await Chillers.find({deviceType: 1});
  const names = [];

  records.forEach(function (record) {
      names.push(record.name);
  });

  return names;
}

const createChillerModel = async (id, name) => {
  /**
   * * This function will create mongoose model by id and name
   */
  const ChillerI = mongoose.model(`Chiller${id}`, chillersSchema, name);
  return ChillerI;
}

const loadMongooseModels = async () => {
  /**
   * * This function runs when connecting to db successfuly
   */
  const chillers = await getAllChillers();
  chillers.forEach((name, index) => {
    const id = index + 1;
    createChillerModel(id, name);
  });
}

module.exports = {
  loadMongooseModels
};