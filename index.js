const path = require('path')
const express = require('express')
const socketIO = require('socket.io')

const app = express()

//App settings
app.set('port', process.env.PORT || 3000)

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Start Server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})

const io = socketIO(server)

//Web Sockets
io.on('connection', (socket) => {
    console.log('New connection', socket.id)

    socket.on('chat:message', (data) => {
        console.log(data)
        io.sockets.emit('chat:message', data) //Si el servidor trasmite el mensaje con el mismo nombre del mensaje entrante el cliente remitente puede recivirlo de vuelta.
    })

    socket.on('chat:typing', (data) => {
        console.log(data, 'typing')
        socket.broadcast.emit('chat:typing', data)
    })
})


