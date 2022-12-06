const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const handlebars = require('express-handlebars')
const ProductosApi = require('./productos.js')
const mensajes = require('./mensajes.js')

const productosApi = new ProductosApi()
const mensajesFile  = new mensajes()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    socket.emit('productos', productosApi.listado());

    socket.on('update', producto => {        
        productosApi.grabar(producto)
        io.sockets.emit('productos', productosApi.listado());
    })

    socket.emit('mensajes', await mensajesFile.listado());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesFile.guardar(mensaje)
        io.sockets.emit('mensajes', await mensajesFile.listado());
    })
});

const connectedServer = httpServer.listen(8080, () => {
        console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })

connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
    