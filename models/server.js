
//Servidor de express
const express = require('express');

//Servidor de sockets
const http = require('http')

//Configuracion del socket server
const socketIO = require('socket.io');  

//path
const path = require('path');

//importar clase Sockets
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;        
        this.server = http.createServer(this.app);                           //http server        
        this.io = socketIO( this.server , { /*Configuraciones*/ } );           //configuracion del socket server
    }

    middlewares() {
        //Desplegar el directorio publico 
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        //inicializar midlewares
        this.middlewares();

        //configurar sockets
        this.configurarSockets();

        //inicializar el server
        this.server.listen( this.port, () => {
            console.log('server corriendo en el puerto: ', this.port );
        })
    }
}

module.exports = Server;