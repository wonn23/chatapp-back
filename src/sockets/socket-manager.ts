import { Server } from 'http';
import { Socket } from 'socket.io';
import { handleDeleteRoom, handleJoinRoom, handleLogin, handleSendMessage } from './chat-socket';
import { roomMiddleware, userMiddleware } from '../middlewares/socket-middleware';

export const cofigureSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    socket.on('login', async (username, cb) => {
      handleLogin(socket, username, cb);
    });

    socket.on('joinRoom', async (roomId, cb) => {
      await userMiddleware(socket, cb);
      handleJoinRoom(socket, roomId, cb);
    });

    socket.on('sendMessage', async (message, cb) => {
      await userMiddleware(socket, cb);
      await roomMiddleware(socket, cb);
      handleSendMessage(socket, message, cb);
    });

    socket.on('deleteRoom', async (roomId, cb) => handleDeleteRoom(socket, roomId, cb));

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
