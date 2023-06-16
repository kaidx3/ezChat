import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const sqlConfig = {
  user: "sa",
  password: "Destiny13245",
  database: "ezChat",
  server: "143.110.209.44",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

const pool = new sql.ConnectionPool(sqlConfig);
const app = express();

const expressServer = http.createServer(app);
const socketIOServer = http.createServer();

const io = new Server(socketIOServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

//routes
import { router as user } from './routes/user.js';
app.use('/user', user);

import { router as chat } from './routes/chat.js';
app.use('/chat', chat);

import { router as message } from './routes/message.js';
app.use('/message', message);

io.on('connection', (socket) => {
  console.log('A user connected.');
  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
  });

  socket.on('joinUpdatesChannel', (userid) => {
    socket.join(userid);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

socketIOServer.listen(5000, async () => {
  await pool.connect();
  app.set('db', pool);
  app.set('socketio', io);
  console.log('Socket.IO server listening on port 5000.');
});

expressServer.listen(3000, () => {
  console.log('Express application listening on port 3000.');
});