import { Socket } from 'socket.io';
import { UserService } from '../services/user.service';
import ChatRoom from '../models/ChatRoom';
import { MessageService } from '../services/message.service';

export const handleLogin = async (socket: Socket, username: string, cb: Function) => {
  try {
    const user = await UserService.saveUser(username, socket.id);
    socket.data.user = user;
    cb({ ok: false, data: user });
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
    chatRoom.participants.push(user._id);
    await chatRoom.save();

    socket.data.room = chatRoom;
    socket.join(roomId);

    cb({ ok: true });
  } catch (error) {
    cb({ ok: false, error: error.message });
  }
};

export const handleSendMessage = async (socket: Socket, message: string, cb: Function) => {
  try {
    const user = socket.data.user;
    const chatRoom = socket.data.room;

    const newMessage = await MessageService.saveMessage(chatRoom._id, user._id, message);

    socket.to(chatRoom._id).emit('message', newMessage);
    cb({ ok: true, data: newMessage });
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
