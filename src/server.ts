import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { configureSocket } from './sockets/socket';
import app from './app';
import { connectMongoDB } from './config/database/data-source';
import { FRONT_URI, PORT } from './config/env';

// HTTP 서버 생성
const httpServer = createServer(app);

// Socket.IO 서버 생성
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: FRONT_URI || '*',
  },
});

// 데이터 베이스 연결
connectMongoDB();

// Socket.IO 서버 생성
configureSocket(io);

// 서버 시작
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
