const express = require('express');
const myDbConnection = require('./db/database'); // connection to db
const modbusConnection = require('./modbus'); // connection to modbus
// const { modbusConnection } = require('./new-modbus');
const app = express();


// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// modbusConnection()

module.exports = app;