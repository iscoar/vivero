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
    console.log(datArduino);
    var today = new Date();
    switch(datos[0]) {
        case "humedad":
            let humedad = 100 - ((parseFloat(datos[1]) * 100) / 1023);
            humedad = humedad.toFixed(1);
            humedad = parseFloat(humedad);
            io.sockets.emit('temp', { time: (today.getHours())+":"+(today.getMinutes()), temp: humedad });
            console.log("enviando datos de humedad");
            break;
        case "LP":
            io.sockets.emit('gas', { gas: datos[1] });
            console.log("enviando datos de gas");
            break;
        case "key":
            io.sockets.emit('key', { acceso: datos[1] });
            console.log("enviando datos de acceso");
            break;
        default:
            console.log("Estos datos no me importan");
    }
    
    
});

io.on('connection', (socket) => {
    console.log("Someone connected."); //show a log as a new client connects.
})