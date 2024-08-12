import { Server } from 'socket.io';
import { userController } from '../controllers/user.controller';
import { messageController } from '../controllers/message.controller';
import ChatRoom from '../models/ChatRoom';

export const configureSocket = (io: Server) => {
  io.on('connection', async socket => {
    console.log('New client connected:', socket.id);

    socket.on('login', async (username, cb) => {
      // 유저 정보 저장
      try {
        const user = await userController.saveUser(username, socket.id);
        socket.data.user = user;
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    // 채팅방 입장
    socket.on('joinRoom', async (roomId, cb) => {
      try {
        const chatRoom = await ChatRoom.findById(roomId);
        if (!chatRoom) {
          return cb({ ok: false, error: 'Chat room not found ' });
        }

        // 유저 찾기
        const user = socket.data.user;
        if (!user) {
          return cb({ ok: false, error: 'User not found' });
        }

        // 채팅방 참가자 추가
        chatRoom.participants.push(user._id);
        await chatRoom.save();

        socket.data.room = chatRoom; // 채팅방 정보를 소켓 객체에 저장
        socket.join(roomId); // 소켓을 채팅방에 참여시킴

        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    // 메시지 보내기
    socket.on('sendMessage', async (message, cb) => {
      console.log('Received message:', message);

      try {
        const user = socket.data.user;
        const chatRoom = socket.data.room;

        if (!user) {
          return cb({ ok: false, error: 'User not found' });
        }

        // 채팅방이 존재하는지 다시 확인
        const existingRoom = await ChatRoom.findById(chatRoom._id);
        if (!existingRoom) {
          return cb({ ok: false, error: 'Chat room has been deleted' });
        }

        // 메세지 저장 및 전송
        const newMessage = await messageController.saveMessage(chatRoom, user, message);

        // 같은 방에 있는 클라이언트에게 메시지 전송
        io.to(chatRoom._id).emit('message', newMessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    // 채팅방 삭제
    socket.on('deleteRoom', async (roomId, cb) => {
      try {
        const chatRoom = await ChatRoom.findByIdAndDelete(roomId);
        if (!chatRoom) {
          return cb({ ok: false, error: 'Chat room not found' });
        }

        // 해당 채팅방에 있는 모든 클라이언트에게 알림
        io.to(roomId).emit('deleteRoom', { message: 'This chat room has been deleted.' });

        // 클라이언트들 룸에서 퇴장시키기
        io.in(roomId).socketsLeave(roomId);
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    // 연결 끊기
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
