import { Server } from 'socket.io';
import { userController } from '../controllers/user.controller';

export const configureSocket = (io: Server) => {
  io.on('connection', async socket => {
    console.log('New client connected:', socket.id);

    socket.on('login', async (username, cb) => {
      // 유저 정보 저장
      console.log('백엔드 유저이름', username, 'socketid', socket.id);
      try {
        const user = await userController.saveUser(username, socket.id);
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on('message', async msg => {
      console.log('Received message:', msg);
      socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
