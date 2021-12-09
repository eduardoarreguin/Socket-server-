

const express  = require('express');       //Servidor de express
const http     = require('http')              //Servidor de sockets
const socketIO = require('socket.io');   //Configuracion del socket server
const path     = require('path');            //path
const cors     = require('cors');            //cors

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

        //CORS
        this.app.use( cors() );
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