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

app.use(cors());
app.use(staticMiddleware);
app.use(router);

io.on('connection', socket => {
  // eslint-disable-next-line no-console
  console.log('user connected');

  socket.on('join', () => {
    // eslint-disable-next-line no-console
    console.log('user joined');
  });

  socket.on('sendMessage', data => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log('user disconnected');
  });
});

http.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
