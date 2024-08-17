import { Socket } from 'socket.io';

export const userMiddleware = async (socket: Socket, cb: Function) => {
  const user = socket.data.user;
  if (!user) {
    cb({ ok: false, error: 'User not found' });
    throw new Error('User not found');
  }
};

export const roomMiddleware = async (socket: Socket, cb: Function) => {
  const chatRoom = socket.data.room;
  if (!chatRoom) {
    cb({ ok: false, error: 'Chat room not found' });
    throw new Error('Chat room not found');
  }
};
