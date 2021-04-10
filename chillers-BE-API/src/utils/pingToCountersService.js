// move this service to MODBUS
var ping = require('ping');
const mongoose = require('mongoose');
const { devicesSchema } = require('./schemas');

const pingToCounters = () => {
    // if host document does not exist on db - it will not be created.
    var hosts = ['172.16.11.195'];
    hosts.forEach(function(host){
        ping.sys.probe(host, function(isAlive){
            const Counter = mongoose.model('Devices', devicesSchema, 'devices');
            const query = { host: host }
            Counter.findOneAndUpdate(query, { isAlive: isAlive }, function(err, result){
                // if isAlive field does not exist on db - it will be created.
                if(err){
                    console.log('Error on health check: ' + err);
                }
                else{
                    console.log('Old document is: ' + result);
                }
            });
        });
    });
}

const countersHealthCheck = () => {
    setTimeout(()=>{
        pingToCounters();
    }, 1000)
}

module.exports = {
    countersHealthCheck
}