const Modbus = require('jsmodbus');


// Initialize of TCP ModBus connection.
const net = require('net');
const socket = new net.Socket();
const unitId = 2;
const client = new Modbus.client.TCP(socket, unitId);
const host = '172.16.11.167';
const port = 502;
const options = {
  'host' : host,
  'port' : port
};

socket.on('connect', async function () {
  try {
    console.log('MODBUS SERVER IS CONNECTED');
    let dataToStore;
    client.readHoldingRegisters(0,8).then((res) => {
      // Consoling the registers from 0 to 8 (9 total)
      console.log(res.response._body._values);
      // Parsing the data
      const data = res.response._body._values;
      dataToStore = {
        dateTime: new Date(),
        enteringTemp: data[0],
        leavingTemp: data[1],
        firstCircuitPressure: data[2],
        secondCiruitPressure: data[3],
        controlPoint: data[4],
        unitPrecentActiveCapacity: data[5],
        demandLimit: data[6],
        chillerState: data[7]
      };
    });
    if(dataToStore) {
      const chillerData = new Chiller(dataToStore);
      await chillerData.save();
    }
  }
  catch(e) {
    console.log('An error occured when tried to get / insert new data from chiller.', e);
  }
});

  socket.on('timeout', ()=> {
    console.log('timeout event fired');
  });

  socket.on('end', ()=> {
    console.log('end event fired');
  });

  socket.on('data', (data)=> {
    socket.write('Server Reply: ' + data);
    // socket.emit('error', new Error('forcefully injected error'));
  });

  socket.on('close', ()=> {
    setTimeout(() => {
      // Reconnecting instead of closing the connection
      console.log('Reconnecting..');
      socket.connect(options);
    },5000);
  });

  socket.on('error', (error)=> {
    console.log(error);
    socket.end('socket can send some more data but it will be ended');
  });

  module.exports = socket.connect(options);
  // socket.connect(options);