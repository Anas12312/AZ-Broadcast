const express = require('express')
const socket = require('socket.io')
const http = require('http')
const cors = require('cors')
const app = express()
const server = http.createServer(app)
app.use(cors)
const io = new socket.Server(server, {
    cors:{
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log("Client Connected")
    socket.on("message_send", (data) => {
        socket.broadcast.emit("message_recieved", {
            message: data.message
        })
    })
})

server.listen(3000, (server)=> {
    console.log("Server Running!")
})