const express = require('express') 
const socket = require('socket.io')

const app = express() 

app.use(express.static('src'))

let port = 8000;
let server = app.listen(port, () =>{
    console.log("listening to port " + port)
})

let io = socket(server);

io.on("connection", (socket) => {
    console.log("socket connection established");

    //received data data from frontend
    socket.on("beginPath", (data) => {
        //transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})
