// create a tcp modbus client
const Modbus = require('jsmodbus');;
const net = require('net');

const socket = new net.Socket();
const unitId = 2;
const client = new Modbus.client.TCP(socket, unitId);
const host = '172.16.11.154';
const port = 502;
const options = {
  'host' : host,
  'port' : port
  };

 

socket.on('connect', function () {
  console.log('SERVER IS CONNECTED');
  // make some calls
  client.readHoldingRegisters(0,8).then((res) => {
    console.log(res.response._body._values);
  });

  });
  socket.on('timeout', ()=> {
    console.log('timeout event fired');
  })



  socket.on('end', ()=> {
    console.log('end event fired');
  })

  socket.on('data', (data)=> {
    socket.write('Server Reply: ' + data);
    // socket.emit('error', new Error('forcefully injected error'));
  })

  socket.on('close', ()=> {
    setTimeout(() => {
      console.log('Reconnecting..');
      socket.connect(options);
    },5000);
  })

  socket.on('error', (error)=> {
    console.log(error);
    socket.end('socket can send some more data but it will be ended');
  })

  socket.connect(options);