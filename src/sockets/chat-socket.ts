import { Socket } from 'socket.io';
import { UserService } from '../services/user.service';
import ChatRoom from '../models/ChatRoom';
import { MessageService } from '../services/message.service';

export const handleLogin = async (socket: Socket, username: string, cb: Function) => {
  try {
    const user = await UserService.saveUser(username, socket.id);
    socket.data.user = user;
    cb({ ok: true, data: user });
  } catch (error) {
    cb({ ok: false, error: error.message });
  }
};

export const handleJoinRoom = async (socket: Socket, roomId: string, cb: Function) => {
  try {
    const chatRoom = await ChatRoom.findById(roomId);
    if (!chatRoom) {
      return cb({ ok: false, error: 'Chat room not found' });
    }

    const user = socket.data.user;
    if (!user) {
      return cb({ ok: false, error: 'User not found' });
    }

    // 참가자가 중복 추가되지 않도록 체크
    if (!chatRoom.participants.includes(user._id)) {
      chatRoom.participants.push(user._id);
      await chatRoom.save();
    }

    socket.data.room = chatRoom; // 소켓에 방 정보 저장
    socket.join(roomId); // 해당 룸에 참가

    const messages = await MessageService.getRoomMessages(roomId);

    // 클라이언트에 기존 메시지 전송
    socket.emit('roomMessages', messages);

    cb({ ok: true });
  } catch (error) {
    cb({ ok: false, error: error.message });
  }
};

export const handleSendMessage = async (
  socket: Socket,
  messageData: { user: any; roomId: string; text: string },
  cb: Function,
) => {
  try {
    const { user, roomId, text } = messageData;

    // 방과 사용자 정보 확인
    const chatRoom = await ChatRoom.findById(roomId);
    if (!chatRoom) {
      return cb({ ok: false, error: 'Chat room not found' });
    }

    if (!user) {
      return cb({ ok: false, error: 'User not found' });
    }

    // 메시지 저장
    const newMessage = await MessageService.saveMessage(roomId, user._id, text);

    // 해당 방의 다른 사용자들에게 메시지 전송
    cb({ ok: true, data: newMessage });

    // 메시지를 해당 방의 다른 사용자에게 브로드캐스트
    socket.to(roomId).emit('message', newMessage);
  } catch (error) {
    cb({ ok: false, error: error.message });
  }
};

export const handleDeleteRoom = async (socket: Socket, roomId: string, cb: Function) => {
  try {
    const chatRoom = await ChatRoom.findByIdAndDelete(roomId);
    if (!chatRoom) return cb({ ok: false, error: 'Chat room not found' });

    socket.to(roomId).emit('deleteRoom', { message: 'This chat room has been deleted.' });
    socket.leave(roomId);

    cb({ ok: true });
  } catch (error) {
    cb({ ok: false, error: error.message });
  }
};
