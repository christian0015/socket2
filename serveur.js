const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const users = {};

io.on('connection', (socket) => {
    socket.on('user-connected', (username) => {
        users[username] = socket.id;
        io.emit('update-user-list', Object.keys(users));
    });

    socket.on('send-message', (data) => {
        const { to, message } = data;
        const toSocketId = users[to];
        if (toSocketId) {
            io.to(toSocketId).emit('message', { from: socket.id, message });
        }
    });

    socket.on('disconnect', () => {
        const username = Object.keys(users).find((key) => users[key] === socket.id);
        if (username) {
            delete users[username];
            io.emit('update-user-list', Object.keys(users));
        }
    });
});


// server.listen(3000, () => {
//     console.log('Serveur en écoute sur le port 3000');
// });

const port = process.env.PORT || 80;
server.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
