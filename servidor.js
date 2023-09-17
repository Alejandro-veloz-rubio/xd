const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);

const port = 1883; // Puerto en el que se ejecutará el servidor MQTT

// Escuchar conexiones en el puerto especificado
server.listen(port, function () {
    console.log(`Servidor MQTT en funcionamiento en el puerto ${port}`);
});

// Manejar eventos cuando un cliente se conecta
aedes.on('client', function (client) {
    console.log(`Cliente conectado: ${client.id}`);
});

// Manejar eventos cuando un cliente publica un mensaje
aedes.on('publish', function (packet, client) {
    if (client) {
        console.log(`Mensaje recibido de ${client.id} en el tema ${packet.topic}: ${packet.payload.toString()}`);
    }
});

// Manejar eventos de error
aedes.on('clientError', function (client, err) {
    console.log(`Error del cliente ${client.id}: ${err.message}`);
});

// Manejar eventos de cierre del servidor
server.on('close', function () {
    console.log('Servidor MQTT cerrado');
});

// Capturar señales de terminación (Ctrl+C)
process.on('SIGINT', function () {
    server.close(function () {
        console.log('Servidor MQTT cerrado por solicitud del usuario');
        process.exit();
    });
});
