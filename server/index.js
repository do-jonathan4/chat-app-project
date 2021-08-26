require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: { origin: `http://localhost:${process.env.DEV_SERVER_PORT}` }
});
const cors = require('cors');
const router = require('./routes');
const dB = require('./queries');
const { path } = require('dotenv/lib/env-options');

app.use(cors());
app.use(staticMiddleware);
app.use(router);
app.use((req, res) => {
  res.sendFile('/index.html', {
    root: path.join(__dirname, 'public')
  });
});

io.on('connection', socket => {
  socket.on('join', ({name, room}) => {
    dB.addUser({ id: socket.id, name, room })
      .then(user => {
        socket.join(user.room);

        dB.getMessages(user.room)
        .then(messages => messages.forEach(msg => socket.emit('message', msg)))
        return user
      })
      .then(user => {
        socket.emit('message', {
          user: 'Admin',
          text: `${user.name}, welcome to room ${user.room}.`
        });

        dB.createMessage(user.room, 'Admin', `${user.name} has joined!`)
        .then(msg => socket.broadcast.to(user.room).emit('message', msg))
        return user
      })
      .then(user => {
        dB.getUsersInRoom(user.room)
        .then(users => {
          io.to(user.room).emit('roomData', {
            room: user.room,
            users: users
          })
        })
      })
      .catch(alertMsg => socket.emit('userExists', alertMsg))

  })

  socket.on('sendMessage', message => {
    dB.getUser(socket.id)
    .then(user => {
      dB.createMessage(user.room, user.name, message)
      .then(msg => io.to(user.room).emit('message', msg))
    })
    .catch(err => { throw err })
  })

  socket.on('disconnect', () => {
    dB.removeUser(socket.id)
      .then(user => {
        dB.createMessage(user.room, 'Admin', `${user.name} has left!`)
        .then(msg => io.to(user.room).emit('message', msg))
        return user
      })
      .then(user => {
        dB.getUsersInRoom(user.room)
          .then(users => {
            io.to(user.room).emit('roomData', {
              room: user.room,
              users: users
            })
          })
      })
      .catch(err => {throw err})
  })
})

http.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
