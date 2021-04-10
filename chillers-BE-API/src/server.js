const express = require('express');
const myDbConnection = require('./db/database');
const app = express();
//copy these lines to MODBUS
const pi = require('./utils/pingToCountersService');
pi.countersHealthCheck();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

const router = require('./routes/routes');

app.use('/api/1', router);

module.exports = app;