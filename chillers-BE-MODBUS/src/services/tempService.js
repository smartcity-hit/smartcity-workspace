const Modbus = require('jsmodbus');
const net = require('net');
const mongoose = require('mongoose');
const { countersSchema } = require('../utils/schemas');
const DBobj = mongoose.model('counters', countersSchema, 'counters');
const myDbConnection = require('../db/database'); // connection to db

function connectToCounter(counter) {
  const socket = new net.Socket();
  const unitId = 1;
  const client = new Modbus.client.TCP(socket, unitId);
  const port = 502;
  const options = {
    'host': counter.host,
    'port': port
  }

  socket.on('connect', async function () {
    console.log("connect")
    const c1 = client.readHoldingRegisters(7537, 2);
    const c2 = client.readHoldingRegisters(7136, 2);
    const c3 = client.readHoldingRegisters(7138, 2);
    const c4 = client.readHoldingRegisters(7539, 2);
    const c5 = client.readHoldingRegisters(7140, 2);
    const c6 = client.readHoldingRegisters(273, 2);

    var data = [];
    let dataToStore;

    Promise.all([c1, c2, c3, c4, c5, c6]).then(async (values) => {
      values.map(value => {
        value.response._body._values.map(val => data.push(val));
      });

      dataToStore = {
        dateTime: new Date(),
        i1: data[0],
        i2: data[1],  
        i3: data[3],
        n_v1: data[4],
        n_v2: data[5],
        n_v3: data[6],
        v1_v2: data[7],
        v1_v3: data[8],
        v2_v3: data[9],
        cos: data[10],
        counterName: counter.name
      }

      if(dataToStore){
        console.log(dataToStore)
        const counterData = new DBobj(dataToStore);
        await counterData.save();
        console.log('SAVED_DATA');
      }
    }).catch(error => {
      console.log(error);
    });
  });

  socket.on('timeout', () => {
    console.log('on timeout');
    socket.destroy()
  });
  
  socket.on('end', () => {
    console.log('on end');
  });
  
  socket.on('close', () => {
    console.log('on close');
    console.log('Reconnecting..');
    socket.connect(options);
  });
  
  socket.on('error', (error) => {
    console.log(error);
    socket.end('socket can send some more data but it will be ended');
  });

  socket.setTimeout(10000);
  socket.connect(options);
};

module.exports = connectToCounter