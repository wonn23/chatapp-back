import { IChatRoom } from '../models/ChatRoom';
import Message from '../models/Message';
import { IUser } from '../models/User';

export const MessageService = {
  async saveMessage(chatRoom: IChatRoom, user: IUser, message: string) {
    try {
      const newMessage = new Message({
        chatRoom: {
          id: chatRoom._id,
          name: chatRoom.title,
        },
        sender: {
          id: user._id,
          name: user.name,
        },
        message,
      });

      await newMessage.save();
      return newMessage;
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  },
};
