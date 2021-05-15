require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

const router = require('./routes');

app.use(cors());
app.use(router)
app.use(staticMiddleware);


io.on('connect', (socket) => {
  console.log('user connected')
  socket.on('join', () => {
    console.log('user joined')
  })

  socket.on('sendMessage', (data) => {
    console.log(data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
})

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
