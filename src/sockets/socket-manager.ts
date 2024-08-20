import { Server, Socket } from 'socket.io';
import { handleDeleteRoom, handleJoinRoom, handleLogin, handleSendMessage } from './chat-socket';
import { roomMiddleware, userMiddleware } from '../middlewares/socket.middleware';

export const configureSocket = (io: Server) => {
  io.on('connection', async (socket: Socket) => {
    console.log('New client connected:', socket.id);

    socket.on('login', async (username, cb) => {
      await handleLogin(socket, username, cb);
    });

    socket.on('joinRoom', async (roomId, cb) => {
      await userMiddleware(socket, cb);
      await handleJoinRoom(socket, roomId, cb);
    });

    socket.on('sendMessage', async (message, cb) => {
      const { user, roomId } = message;

      // 소켓에 저장된 사용자 및 방 정보 확인
      const socketUser = socket.data.user;
      const socketRoom = socket.data.room;

      // 우선 소켓의 정보가 있으면 사용, 없으면 메시지에서 확인
      const currentUser = socketUser || user;
      const currentRoom = socketRoom || roomId;

      if (!currentUser || !currentRoom) {
        return cb({ ok: false, error: 'User or Room not found' });
      }

      // 소켓 세션에 정보를 저장 (유저와 방 정보 덮어쓰기)
      socket.data.user = currentUser;
      socket.data.room = currentRoom;

      // 메시지 저장 또는 처리
      await handleSendMessage(socket, { ...message, user: currentUser, roomId: currentRoom }, cb);
    });

    socket.on('deleteRoom', async (roomId, cb) => handleDeleteRoom(socket, roomId, cb));

    socket.on('disconnect', async () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
