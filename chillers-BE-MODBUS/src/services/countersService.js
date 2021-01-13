const net = require('net');
const Modbus = require('jsmodbus');

class CountersService{
    constructor(counter){
        this.options = {
            'host': counter.host,
            'port': 502
        };

        this.name = counter.name;
        this.unitId = 1;
        this.initialModbusConnection();
    }

    initialModbusConnection(){
        this.socket = new net.Socket();
        this.client = new Modbus.client.TCP(this.socket, this.unitId);
        // what will happend on error 
        this.socket.on('error', (error)=> { this.onError(error) });
        // what will happend on timeout 
        this.socket.on('timeout', this.onTimeout);
        // what will happend on close 
        this.socket.on('end', this.onEnd);
        this.socket.on('close', this.onClose);
        // what will happend on connect
        this.socket.on('data', this.onData);
        this.socket.on('connect', this.onConnect());
    }

    onTimeout = function(){
      console.log('on timeout ' + this.name);
    }

    onEnd = function(){
      console.log('on end ' + this.name);
    }
  
    onData = function(){
      this.socket.write('Server Reply: ' + data);
    }
  
    onError = function(error){
      console.log('on error ' + this.name);
      console.log(error);
      this.socket.end('socket can send some more data but it will be ended');
    }

    onClose = function(){
      console.log('on close');
    }

    connectToCounter(){
      console.log('connecting to ' + this.name);
      this.socket.connect(this.options);
      //this.tempFunc()
    }

    onConnect = async function() {
      const client = this.client;
      try {
        console.log('on connect');
        const c1 = client.readHoldingRegisters(7537, 2);
        const c2 = client.readHoldingRegisters(7136, 2);
        const c3 = client.readHoldingRegisters(7138, 2);
        const c4 = client.readHoldingRegisters(7539, 2);
        const c5 = client.readHoldingRegisters(7140, 2);
        const c6 = client.readHoldingRegisters(273, 2);
 
        Promise.all([c1, c2, c3, c4, c5, c6]).then((values) => {
          values.map(value => {
            console.log(value.response._body._values);
          });
        }).catch(error => {
          console.log(error);
        });
      }
      catch(e) {
        console.log('An error occured when tried to get / insert new data from chiller.', e.response._body);
      }
    }
}

module.exports = CountersService