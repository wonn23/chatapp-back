import Message, { IMessage } from '../models/Message';

export const MessageService = {
  saveMessage: async (roomId: string, userId: string, text: string): Promise<IMessage> => {
    try {
      const newMessage = new Message({
        roomId,
        userId,
        text,
        createdAt: new Date(),
      });

      await newMessage.save();
      return newMessage;
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  },

  // 특정 채팅방의 메시지 가져오기
  getRoomMessages: async (roomId: string): Promise<IMessage[]> => {
    try {
      const messages = await Message.find({ roomId })
        .populate('userId', 'name profilePicture') // 유저 정보 추가
        .sort({ createdAt: 1 }); // 생성된 시간 순으로 정렬

      return messages || [];
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  },
};
