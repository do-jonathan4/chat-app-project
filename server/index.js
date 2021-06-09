require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const router = require('./routes');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.use(cors());
app.use(staticMiddleware);
app.use((req, res) => {
  res.sendFile('/index.html', {
    root: path.join(__dirname, 'public')
  });
});
app.use(router);

io.on('connection', socket => {
  socket.on('join', ({name, room}) => {
    const { user } = addUser({ id: socket.id, name, room });
    socket.join(user.room);

    socket.emit('message', {
      user: 'Admin',
      text: `${user.name}, welcome to room ${user.room}.`
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'Admin',
      text: `${user.name} has joined!`
    });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
  });

  socket.on('sendMessage', message => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
      user: user.name,
      text: message
    });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

http.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
