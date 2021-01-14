const express = require('express');
const app = express();
const myDbConnection = require('./db/database'); // connection to db
//const chillersService = require('./services/chillersService');
//const countersService = require('./services/countersService');
const countersService = require('./services/tempService');
const counters = require('./utils/constants/counters');
const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
app.use(express.json());


setInterval(function(){
  countersService({'host': '172.16.11.194', 'name': 'name'});
}, 5000);

// var cs;
// var countersInstances = [];

// cs = new countersService({'host': '172.16.11.194', 'name': 'name'});
// cs.initialModbusConnection();

// setInterval(function(){
//   cs.connectToCounter();
// }, 5000);

