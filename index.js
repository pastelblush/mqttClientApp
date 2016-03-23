//express and socket part
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var utf8 = require('utf8');
var encoding = require("encoding");

// used npm install encoding and npm install iconv-lite


var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
// mqtt telemetry part
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


app.use('/jquery', express.static("node_modules/jquery/dist"));//(__dirname + '\\node_modules\\jquery\\dist\\'));
app.use(express.static('public'));
app.use('/jqPlot', express.static("node_modules/jqPlot"));

app.get('/',function (req,res) {
   /* body... */
   // res.send('<h1>Hello world<h1>'); 
   res.sendFile(__dirname + '/index.html');
});


io.on('connection',function (socket) {
   /* body... */ 
   console.log('a user connected')
   socket.on('disconnect',function () {
     /* body... */ 
     console.log('a user disconnected')
   })

   socket.on('chat message', function (msg) {
     /* body... */ 
     //socket.broadcast.emit('chat message',msg);
     io.emit('chat message',msg);
   });

   socket.on('bVal', function (msg) {
     /* body... */ 
     //socket.broadcast.emit('chat message',msg);
     var jsonstring = JSON.stringify(msg);
     //console.log(jsonstring);

     var resultBuffer = encoding.convert(jsonstring, 'utf8');
     console.log(resultBuffer);
     client.publish('bVal', resultBuffer);
     //client.publish('triggers', utf8.encode(jsonstring));
     //console.log(utf8.encode(jsonstring));
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
  //console.log(obj);
  //console.log(obj.stringVal)

  io.emit('plc_input',obj)
});

console.log(__dirname + '\\node_modules\\jquery\\dist\\');