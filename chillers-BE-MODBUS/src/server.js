const myDbConnection = require('./db/database'); // connection to db
const chillersService = require('./services/chillersService');
//const countersService = require('./services/countersService');
const countersService = require('./services/tempService');
const pi = require('./services/countersHealthCheckService');
pi.countersHealthCheck();

countersService({'host': '172.16.11.218', 'name': 'cellcom'});
countersService({'host': '172.16.11.217', 'name': 'pelephone'});
countersService({'host': '172.16.11.219', 'name': 'orange'});
