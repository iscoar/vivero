var express = require('express');
var SerialPort = require('serialport');

var app = express();
var server = app.listen(3000, () => {
	console.log('Servidor escuchando en el puerto 3000');
})
server.on('error', (err) => {
	console.error(err);
});
var io = require('socket.io')(server);
app.use(express.static('public'));

var Readline = SerialPort.parsers.Readline;
var port = new SerialPort('COM3');
var parser = port.pipe(new Readline({delimiter: '\r\n'}));

parser.on('data', (temp) => { //Read data
    console.log(temp);
    var today = new Date();
    io.sockets.emit('temp', {date: today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes()), temp:temp}); //emit the datd i.e. {date, time, temp} to all the connected clients.
});

io.on('connection', (socket) => {
    console.log("Someone connected."); //show a log as a new client connects.
})