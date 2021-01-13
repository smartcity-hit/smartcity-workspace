const express = require('express');
const app = express();
const myDbConnection = require('./db/database'); // connection to db
//const chillersService = require('./services/chillersService');
//const countersService = require('./services/countersService');
const countersService = require('./services/tempcounter');
const counters = require('./utils/constants/counters');
const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
app.use(express.json());


//countersService('172.16.11.194')
var cs;
counters.forEach(counter => {
// cs = new countersService({ 'host': '172.16.11.194', 'name': 'counter1' });
// cs.connectToCounter();
countersService(counter.ip)

})
