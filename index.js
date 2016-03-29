//express and socket part
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var utf8 = require('utf8');
var encoding = require("encoding");

// used npm install encoding and npm install iconv-lite

//chart side
var t = 1000;
var x = (new Date()).getTime(); // current time
var n = 100;
chart_data = [];

for(i=0; i<n; i++)
{  
    chart_data.push([x - (n-1-i)*t,0]);  
}  


var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
// mqtt telemetry part
function inputs () {
     // body...  
     this.bEmergency = false;
     this.bIOTerm = false;
     this.rTemp = 0.0;
     this.bTemp = false;     
     this.bFloat1 = false;
     this.bfloat2 = false;
     this.bfloat3 = false;
     this.rTankLevel = 0.0;
     this.bPump1 = false;
     this.bPump2 = false;
     this.bAuto = false;
     this.rTempLimit = 0.0;
     // this.syncUpdate = 0;
   }


var obj = new inputs();


app.use('/jquery', express.static("node_modules/jquery/dist"));//(__dirname + '\\node_modules\\jquery\\dist\\'));
app.use(express.static('public'));
app.use('/jqPlot', express.static("node_modules/jqPlot"));
app.use('/bootstrap', express.static("node_modules/bootstrap/dist"));

app.get('/',function (req,res) {
   /* body... */
   // res.send('<h1>Hello world<h1>'); 
   res.sendFile(__dirname + '/dashboard.html');
});


io.on('connection',function (socket) {
   /* body... */ 
   console.log('a user connected')
   io.emit('plc_input',obj);
   io.emit('table_data', chart_data);
   socket.on('disconnect',function () {
     /* body... */ 
     console.log('a user disconnected')
   })

   // socket.on('chat message', function (msg) {
   //   /* body... */ 
   //   //socket.broadcast.emit('chat message',msg);
   //   io.emit('chat message',msg);
   // });

   socket.on('bAuto', function (msg) {
     var jsonstring = JSON.stringify(msg);
     var resultBuffer = encoding.convert(jsonstring, 'utf8');
     client.publish('bAuto', resultBuffer);
     console.log(msg);
   });

   socket.on('bPump1', function (msg) {
     var jsonstring = JSON.stringify(msg);
     var resultBuffer = encoding.convert(jsonstring, 'utf8');
     client.publish('bPump1', resultBuffer);
     console.log(msg);
   });

   socket.on('bPump2', function (msg) {
     var jsonstring = JSON.stringify(msg);
     var resultBuffer = encoding.convert(jsonstring, 'utf8');
     client.publish('bPump2', resultBuffer);
     console.log(msg);
   });

   socket.on('rTempLimit', function (msg) {
     var jsonstring = JSON.stringify(msg);
     var resultBuffer = encoding.convert(jsonstring, 'utf8');
     client.publish('rTempLimit', resultBuffer);
     console.log(msg);
   });
});

http.listen(3000,function () {
   /* body... */ 
   console.log('listening on *:3000')
})



// console.log(obj);


client.on('connect', function () {
  client.subscribe('presence');
});
 
client.on('message', function (topic, message) {
  // message is Buffer 
  obj = JSON.parse(message);
  io.emit('plc_input',obj);
});


setInterval(function () {
   /* body... */ 

  if(chart_data.length > n-1){
    chart_data.shift();
  }

  var y = obj.rTankLevel;
  var x = (new Date()).getTime();
  chart_data.push([x,y]);
  io.emit('table_data', chart_data);
}, 1000)



console.log(__dirname + '\\node_modules\\jquery\\dist\\');