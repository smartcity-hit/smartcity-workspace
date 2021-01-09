const net = require('net');
const Modbus = require('jsmodbus');

class CountersService{
    constructor(counter){
        this.options = {
            'host': counter.host,
            'port': 502
        };

        this.name = counter.name;
        this.client;
        this.socket;
        this.unitId = 1;
        this.initialModbusConnection();
    }

    initialModbusConnection = function(){
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
        this.socket.on('connect', this.onConnect);
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

    connectToCounter() {
      console.log('connecting to ' + this.name);
      this.socket.connect(this.options);
    }

    onConnect = async function () {
      try {
        console.log('MODBUS SERVER IS CONNECTED');
        let dataToStore;
        await this.client.readHoldingRegisters(0,8).then(async (res) => {
          // Consoling the registers from 0 to 8 (9 total)
          console.log(res.response._body._values);
          // Parsing the data
          const data = res.response._body._values;
          dataToStore = {
            dateTime: new Date(),
            enteringWaterTemp: data[0],
            leavingWaterTemp: data[1],
            firstCircuitPressure: data[2],
            secondCiruitPressure: data[3],
            controlPoint: data[4],
            unitPrecentActiveCapacity: data[5],
            demandLimit: data[6],
            chillerState: data[7],
            chillerName: "chiller1"
          };
    
          if (dataToStore) {
          const ChillerI = mongoose.model('Chillers', chillersSchema, 'chillers');
          const chillerData = new ChillerI(dataToStore);
          await chillerData.save();
          console.log('SAVED_DATA');
        }
        });
      }
      catch(e) {
        console.log('An error occured when tried to get / insert new data from chiller.', e.response._body);
      }
    }
}

module.exports = CountersService