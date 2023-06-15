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
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

const pool = new sql.ConnectionPool(sqlConfig);
const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors()); // Enable CORS for the Express application
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

  // Handle events or emit messages to clients
  socket.on('joinChat', (chatId) => {
    // Join the room corresponding to the chat ID
    socket.join(chatId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

server.listen(5000, async () => {
  await pool.connect();
  app.set('db', pool);
  app.set('socketio', io);
  console.log('Socket.IO server listening on port 5000.');
});

app.listen(3000, () => {
  console.log('Express application listening on port 3000.');
});
