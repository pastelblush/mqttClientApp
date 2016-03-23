// client1.js

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost',{port:1883});
 
client.on('connect', function () {
  client.subscribe('presence');
  setInterval(function () {
  	 /* body... */ 
  	 client.publish('presence', 'Hello mqtt');
  }, 1000)
});

