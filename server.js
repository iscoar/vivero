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
var port = new SerialPort('COM5', {
    baudRate: 9600
});
var parser = port.pipe(new Readline({delimiter: '\r\n'}));

parser.on('data', (datArduino) => { //Read data
    datArduino.split(':', 1);
    console.log(datArduino[0]);
    console.log(datArduino[1]);
    var today = new Date();
    switch(datArduino[0]) {
        case "humedad":
            io.sockets.emit('temp', { time: (today.getHours())+":"+(today.getMinutes()), temp: datArduino[1]});
            break;
        case "LP":
            io.sockets.emit('gas', { gas: datArduino[1] });
            break;
        case "acceso":
            io.sockets.emit('acceso', { acceso: datArduino[1] });
            break;
        default:
            console.log("No se esta recibiendo datos");
    }
    
    
});

io.on('connection', (socket) => {
    console.log("Someone connected."); //show a log as a new client connects.
})