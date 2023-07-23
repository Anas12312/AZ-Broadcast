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
function findRooms() {
    var availableRooms = [];
    var rooms = io.sockets.adapter.rooms;
    if (rooms) {
        for (var room in rooms) {
            if (!rooms[room].hasOwnProperty(room)) {
                availableRooms.push(room);
            }
        }
    }
    return availableRooms;
}
io.on('connection', (socket) => {
    socket.on('create', () => {
        const roomId = parseInt(Math.random() * 1000000).toString()
        socket.join(roomId)
        socket.emit("created", {
            roomId
        })
    })
    socket.on('join', (data) => {
        if(io.sockets.adapter.rooms.get(data.roomId)) {
            socket.join(data.roomId)
            socket.emit("joined", {
                message: "done"
        })
        }else {
            socket.emit("error", {
                message: "This Room Doesn't Exist"
            })
        }
    })
    socket.on("message_send", (data) => {
        socket.join(data.message)
    })
})

server.listen(3000, (server)=> {
    console.log("Server Running!")
})