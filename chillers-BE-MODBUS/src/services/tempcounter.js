const Modbus = require('jsmodbus');
const net = require('net');
// Initialize TCP ModBus connection.

const socket = new net.Socket();
const unitId = 1;
const client = new Modbus.client.TCP(socket, unitId);
let host = '172.16.11.194';
const port = 502;
const options = {
  'host': host,
  'port': port
};

socket.on('timeout', () => {
  console.log('on timeout');
});

socket.on('end', () => {
  console.log('on end');
});

socket.on('data', (data) => {
  socket.write('Server Reply: ' + data);
});

socket.on('close', () => {
  setTimeout(() => {
    // Reconnecting instead of closing the connection
    console.log('Reconnecting..');
    socket.connect(options);
  }, 5000);
});

socket.on('error', (error) => {
  console.log(error);
  socket.end('socket can send some more data but it will be ended');
});

function connectToCounter(hostIP) {
  const socket = new net.Socket();
  const unitId = 1;
  const client = new Modbus.client.TCP(socket, unitId);
  const port = 502;

  socket.on('connect', async function () {
    const c1 = client.readHoldingRegisters(7537, 2);
    const c2 = client.readHoldingRegisters(7136, 2);
    const c3 = client.readHoldingRegisters(7138, 2);
    const c4 = client.readHoldingRegisters(7539, 2);
    const c5 = client.readHoldingRegisters(7140, 2);
    const c6 = client.readHoldingRegisters(273, 2);

    Promise.all([c1, c2, c3, c4, c5, c6]).then((values) => {
      values.map(value => {
        console.log(value.response._body._values)
      });
    }).catch(error => {
      console.log(error);
    });
  });
  
  socket.on('error', (error) => {
    console.log(error);
    socket.end('socket can send some more data but it will be ended');
  });
  
  socket.connect({
    'host': hostIP,
    'port': port
  });
};

module.exports = connectToCounter