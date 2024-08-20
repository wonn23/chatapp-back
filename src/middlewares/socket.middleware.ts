import { Socket } from 'socket.io';

export const userMiddleware = async (socket: Socket, cb: Function) => {
  try {
    const user = socket.data.user;

    if (!user) {
      cb({ ok: false, error: 'User not found' });
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error in userMiddleware:', error.message);
    cb({ ok: false, error: error.message });
  }
};

export const roomMiddleware = async (socket: Socket, cb: Function) => {
  try {
    const chatRoom = socket.data.room;

    if (!chatRoom) {
      cb({ ok: false, error: 'Chat room not found' });
      throw new Error('Chat room not found');
    }
  } catch (error) {
    console.error('Error in roomMiddleware:', error.message);
    cb({ ok: false, error: error.message });
  }
};
