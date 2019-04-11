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
var port = new SerialPort('COM4', {
    baudRate: 9600
});
var parser = port.pipe(new Readline({delimiter: '\r\n'}));

parser.on('data', (datArduino) => { //Read data
    let datos = datArduino.split(':');
    console.log(datos[0]);
    console.log(datos[1]);
    console.log(typeof datos[0]);
    console.log(typeof parseInt(datos[1]));
    var today = new Date();
    switch(datos[0]) {
        case "humedad":
            io.sockets.emit('temp', { time: (today.getHours())+":"+(today.getMinutes()), temp: parseInt(datos[1]) });
            console.log("enviando datos de humedad");
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