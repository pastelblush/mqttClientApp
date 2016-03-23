// client1.js

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
 
client.on('connect', function () {
  client.subscribe('presence');
  setInterval(function () {
  	 /* body... */ 
  	 client.publish('presence', 'Hello mqtt');
  }, 1000)
});

