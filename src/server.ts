import express from "express";
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users:any = {};

io.on('connection', (socket:any) => {
    if (!users[socket.id]) {
        users[socket.id] = socket.id
    }
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data:any) => {
        io.to(data.userToCall.emit('hey', {signal: data.signalData, from: data.from}));
    })

    socket.on("acceptCall", (data:any) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
});

server.listen(8000, () => console.log('server is running on port 8000'));