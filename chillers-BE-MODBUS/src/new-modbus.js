const Modbus = require('jsmodbus');
const mongoose = require('mongoose');
const { getChillersSettings, loadMongooseModels, chillersSchema } = require('./utils/chillersService')

// Initialize of TCP ModBus connection.
const net = require('net');
const socket = new net.Socket();


const modbusConnection = async () => {
  while(true) {
    try {
      await loadMongooseModels();
      const chillers = await getChillersSettings();
      chillers.forEach((chiller) => {
        // set the modbus configuration for the chiller
        const client = new Modbus.client.TCP(socket, chiller.unitId);
        const host = chiller.host;
        const port = chiller.port;
        const options = {
          'host' : host,
          'port' : port
        };

        // listen to the socket events
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
                enteringWaterTemp: data[0],
                leavingWaterTemp: data[1],
                firstCircuitPressure: data[2],
                secondCiruitPressure: data[3],
                controlPoint: data[4],
                unitPrecentActiveCapacity: data[5],
                demandLimit: data[6],
                chillerState: data[7]
              };
            });
            if (dataToStore) {
              console.log(dataToStore);
              // find the model for the selected chiller
              const collectionName = chiller.name[0].toUpperCase() + chiller.name.slice(1);
              const ChillerI= mongoose.model(collectionName, chillersSchema, chiller.name);
              // save data in db
              const chillerData = new ChillerI(dataToStore);
              await chillerData.save();
              console.log('SAVED_DATA');
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
            // setTimeout(() => {
            //   // Reconnecting instead of closing the connection
            //   console.log('Reconnecting..');
            //   socket.connect(options);
            // },5000);
          });

          socket.on('error', (error)=> {
            console.log(error);
            socket.end('socket can send some more data but it will be ended');
          });

        // connect via modbus TCP
        socket.connect(options);
      });
    }
    catch(err) {
      console.log(err);
    }
  }
}

module.exports = { modbusConnection };