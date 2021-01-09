require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const { loadMongooseModels } = require('../services/dbService');

async function myDbConnection() {

  try {
    mongoose.set('useNewUrlParser',true);
    mongoose.set('useCreateIndex',true);
    const uri = process.env.DB_URI;
    let connectionPromise = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    if (mongoose.connection) {
        logger.info('Connected Successfully to DB');
        await loadMongooseModels();
        logger.info('Mongoose Models Successfully loaded from DB');
        global.connectionPromise = connectionPromise;
    } else { global.connectionPromise = null;
            logger.warn('not connected to DB') }
    return connectionPromise;
  } catch (error) {
      logger.error('Error connecting to DB ::', error);
  }
}

module.exports = myDbConnection();
