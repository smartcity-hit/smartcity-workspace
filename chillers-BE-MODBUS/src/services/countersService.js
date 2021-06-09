const Modbus = require('jsmodbus');
const net = require('net');
const mongoose = require('mongoose');
const { countersSchema } = require('../utils/schemas');
const DBobj = mongoose.model('counters', countersSchema, 'counters');
const myDbConnection = require('../db/database'); // connection to db

class CountersService{
    constructor(counter){
      console.log("constructor");
      this.options = {
          'host': counter.host,
          'port': 502
      };
      this.name = counter.name;
      this.unitId = 1;
    }

    initialModbusConnection(){
      console.log("initial");
      this.socket = new net.Socket();
      this.client = new Modbus.client.TCP(this.socket, this.unitId);

      this.socket.setTimeout(10000);
      this.socket.connect(this.options);

      this.socket.on('connect', () => {this.onConnect()})

      this.socket.on('end', () => {this.onEnd()});
      
      this.socket.on('data', (data) => {this.onData(data)});
      
      this.socket.on('close', () => {this.onClose()});
      
      this.socket.on('error', (error) => {this.onError(error)});

      this.socket.on('timeout', () => {this.onTimeout()});
    }

    onTimeout(){
      console.log('on timeout');
      this.socket.destroy();
    }

    onEnd(){
      console.log('on end');
    }
  
    onData(data){
      this.socket.write('Server Reply: ' + data);
    }
  
    onError(error){
      console.log(error);
      this.socket.end('socket can send some more data but it will be ended');
    }

    onClose(){
      console.log('on close');
      console.log('Reconnecting..');
      this.socket.connect(this.options);
    }

    connectToCounter(){
      this.socket.setTimeout(10000);
      this.socket.connect(this.options);
    }

    async onConnect() {
      console.log("connect")
      const c1 = this.client.readHoldingRegisters(7537, 2);
      const c2 = this.client.readHoldingRegisters(7136, 2);
      const c3 = this.client.readHoldingRegisters(7138, 2);
      const c4 = this.client.readHoldingRegisters(7539, 2);
      const c5 = this.client.readHoldingRegisters(7140, 2);
      const c6 = this.client.readHoldingRegisters(273, 2);
  
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
          counterName: this.name
        }
  
        if(dataToStore){
          console.log(dataToStore);
          const counterData = new DBobj(dataToStore);
          await counterData.save();
          console.log('SAVED_DATA');
          this.socket.destroy();
        }
      }).catch(error => {
        console.log(error);
      });
    }
}

module.exports = CountersService