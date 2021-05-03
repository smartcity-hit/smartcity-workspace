require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../utils/logger');

async function myDbConnection() {
  try {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    
    const uri = process.env.DB_URI;
    let connectionPromise = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    if (mongoose.connection) {
      logger.info('Connected Successfully to DB');
      global.connectionPromise = connectionPromise;
    } 
    else {
      global.connectionPromise = null;
      logger.warn('not connected to DB');
    }

    return connectionPromise;

  } catch (error) {
    logger.error('Error connecting to DB :', error);
  }
}

module.exports = myDbConnection();
