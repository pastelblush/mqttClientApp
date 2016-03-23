// client2.js
function datastruct(){
	this.boolVal='';
    this.intVal='';
    this.dintVal='';
    this.sintVal='';
    this.lrealVal='';
    this.realVal='';
    this.stringVal='';

} 

var obj = new datastruct();

console.log(obj);

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

 
client.on('connect', function () {
  client.subscribe('presence');
});
 
client.on('message', function (topic, message) {
  // message is Buffer 
  obj = JSON.parse(message);
  //obj = message;
  //console.log(obj);
  console.log(obj.intVal)



});